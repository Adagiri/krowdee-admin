import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";

import { IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import {
  imageblobVar,
  imageModalVar,
  catVar,
  imageVar,
  taskModalVar,
  editTaskVar,
  txtVar,
  optsVar,
  validVar,
  taskOptsInvalidVar,
  taskExistVar,
  taskUploadingVar,
  taskInvalidsVar,
  taskForceUploadingVar,
  imgVar,
} from "../state/local";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { chakra } from "@chakra-ui/system";
import { Badge, Box, Flex, SimpleGrid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useAlert } from "react-alert";
import { Img } from "@chakra-ui/image";
import ImageUploadModal from "./ImageUploadModal";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { Select } from "@chakra-ui/select";

import { makeid, taskReset } from "../helper/functions";
import { useDisclosure } from "@chakra-ui/hooks";
import { getUser } from "../helper/auth";
import axios from "axios";
import { ADD_TASK, EDIT_TASK } from "../state/remote/mutations";

function TaskModal({ refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const _id = getUser()._id;

  const alert = useAlert();

  //states
  const taskModal = useReactiveVar(taskModalVar);
  const txt = useReactiveVar(txtVar);
  const cat = useReactiveVar(catVar);
  const opts = useReactiveVar(optsVar);
  const valid = useReactiveVar(validVar);
  const image = useReactiveVar(imageVar);
  const invalids = useReactiveVar(taskInvalidsVar);
  const invalidOpts = useReactiveVar(taskOptsInvalidVar);
  const imageblob = useReactiveVar(imageblobVar);
  const imageModal = useReactiveVar(imageModalVar);
  const editTask = useReactiveVar(editTaskVar);
  const img = useReactiveVar(imgVar);
  const taskExist = useReactiveVar(taskExistVar);
  const taskUploading = useReactiveVar(taskUploadingVar);
  const taskForceUploading = useReactiveVar(taskForceUploadingVar);

  //add task
  const [addTask, {}] = useMutation(ADD_TASK);

  //edit task
  const [editTaskRemote, {}] = useMutation(EDIT_TASK);

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  let variables = {
    cat: cat.toLowerCase(),
    opts,
    valid,
    txt,
    force: false,
  };

  //effect
  useEffect(() => {
    return () => {};
  }, []);

  const handleClose = () => {
    taskReset("closeModal");
  };

  const closeDialog = () => {
    taskExistVar([[], {}]);
    taskUploadingVar(false);
  };

  const validateFields = () => {
    if (!cat) {
      alert.show("category not set", { type: "error", timeout: 1500 });
      taskInvalidsVar([...invalids, "cat"]);

      return false;
    } else if (txt === "" || txt.length < 5) {
      alert.show("question text too short", { type: "error", timeout: 1500 });
      taskInvalidsVar([...invalids, "txt"]);
      return false;
    } else if (opts.find((opt) => opt.opt === "")) {
      opts.forEach((opt) => {
        if (opt.opt === "") {
          taskOptsInvalidVar([...invalidOpts, opt._id]);
          taskInvalidsVar([...invalids, "opts"]);
        }
      });
      alert.show("an option isn't set", { type: "error", timeout: 1500 });
      return false;
    } else if (valid === "") {
      alert.show("Tick a valid option", { type: "error", timeout: 1500 });
      taskInvalidsVar([...invalids, "valid"]);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    try {
      taskUploadingVar(true);

      taskInvalidsVar([]);
      if (!validateFields()) {
        taskUploadingVar(false);
        return "";
      }

      if (imageblob) {
        //generate image url
        const signedUrl = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URI,
          {
            query: `
        query GetS3Url {
          getSignedUrl(input: { _id: "${_id}", contentType: "${imageblob.type}" }) {
            url
            key
          }
        }
      `,
          },
          {
            withCredentials: true,
          }
        );
        const presignedImgUrl = signedUrl.data.data.getSignedUrl.url;
        const imgUrl = signedUrl.data.data.getSignedUrl.key;

        imgVar(imgUrl);

        //upload the image file
        axios
          .put(presignedImgUrl, imageblob, {
            headers: {
              "Content-Type": imageblob.type,
            },
          })
          .then(() =>
            handleTaskUpload({
              ...variables,
              img: imgUrl,
            })
          );
        //upload task
      } else {
        handleTaskUpload(variables);
      }
    } catch (error) {
      taskUploadingVar(false);
      alert.show("something went wrong", { type: "error" });
    }
  };

  //force task upload handler
  const forceTaskUpload = async () => {
    taskForceUploadingVar(true);
    const { __typename, ...rest } = taskExist[1];
    handleTaskUpload({
      ...rest,
      force: true,
      opts: rest.opts.map((opt) => {
        return { opt: opt.opt, _id: opt._id };
      }),
    });
  };

  //task upload handler
  const handleTaskUpload = (variables) => {
    if (editTask) {
      //on the server,
      editTaskRemote({
        variables: {
          ...variables,
          _id: editTask._id,
          prevTxt: editTask.txt,
          img: variables.img
            ? variables.img
            : editTask.img
            ? editTask.img
            : null,
        },
      })
        .then((data) => {
          taskUploadingVar(false);
          if (data.data.editTask.success === true) {
            alert.show("Task edited", { type: "success" });

            refetch();
            taskReset("closeModal");
          } else {
            taskExistVar([
              data.data.editTask.taskExist,
              data.data.editTask.currentTask,
            ]);
          }
        })
        .catch((error) => {
          alert.show("error, something went wrong", { type: "error" });
          taskUploadingVar(false);
        });
    } else {
      addTask({
        variables,
      })
        .then((data) => {
          taskUploadingVar(false);
          console.log(data);
          if (data.data.addTask.success === false) {
            taskExistVar([
              data.data.addTask.taskExist,
              data.data.addTask.currentTask,
            ]);
          } else {
            alert.show("Task added", { type: "success" });
            taskForceUploadingVar(false);
            taskReset();
            refetch();
          }
        })
        .catch((error) => {
          alert.show("error, something went wrong", { type: "error" });
          taskUploadingVar(false);
          taskForceUploadingVar(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={taskModal}
        onClose={handleClose}
        motionPreset="slideInRight"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editTask ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={invalids.indexOf("cat") !== -1}>
              <FormLabel>Category</FormLabel>
              <Select
                value={cat}
                onChange={(e) => {
                  catVar(e.target.value);
                  taskInvalidsVar([]);
                }}
                placeholder="Select category"
              >
                <option>Maths</option>
                <option>Tech</option>
                <option>Science</option>
                <option>Finance</option>
                <option>Programming</option>
                <option>English</option>
                <option>History</option>
              </Select>
              <FormErrorMessage>
                {invalids.indexOf("cat") !== -1 && "category not set"}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              mt={4}
              isRequired
              isInvalid={invalids.indexOf("txt") !== -1}
            >
              <FormLabel>Text</FormLabel>
              <Input
                value={txt}
                onChange={(e) => {
                  txtVar(e.target.value);
                  taskInvalidsVar([]);
                }}
                ref={initialRef}
                placeholder="task question"
              />
              <FormErrorMessage>
                {invalids.indexOf("txt") !== -1 && "text too short"}
              </FormErrorMessage>
            </FormControl>

            <Box d="flex" pt="3" my={3} alignItems="center">
              <chakra.span fontSize="md">Options</chakra.span>
              <IconButton
                size="xs"
                ml={2}
                icon={<BiMinus />}
                onClick={() => {
                  opts.length > 2 && optsVar(opts.slice(0, -1));
                  validVar("");
                }}
                aria-label="minus-button"
              />
              <chakra.span mx={2} fontSize="sm" fontWeight="semibold">
                {opts.length}
              </chakra.span>
              <IconButton
                size="xs"
                icon={<BiPlus />}
                onClick={() => {
                  opts.length < 5 &&
                    optsVar([...opts, { _id: makeid(4), opt: "" }]);
                  validVar("");
                }}
                aria-label="add-button"
              />
            </Box>
            {/*What to render when the button is Clicked  */}
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2}>
              {opts.map((option) => (
                <Box key={option._id}>
                  <FormControl isRequired>
                    <InputGroup size="sm" borderRadius="lg">
                      <InputRightAddon px={1}>
                        <IconButton
                          icon={<BsCheckCircle size="15px" />}
                          variant="ghost"
                          outlineOffset="none"
                          size="xs"
                          aria-label="check-button"
                          onClick={() => {
                            validVar(option._id);
                            taskInvalidsVar([]);
                          }}
                          color={option._id === valid && "#51ff0d"}
                        />
                      </InputRightAddon>{" "}
                      <Input
                        placeholder="type option"
                        value={option.opt}
                        isRequired
                        isInvalid={invalidOpts.indexOf(option._id) !== -1}
                        onChange={(e) => {
                          optsVar(
                            opts.map((opt) =>
                              opt._id === option._id
                                ? { ...opt, opt: e.target.value }
                                : opt
                            )
                          );
                          taskOptsInvalidVar([]);
                          taskInvalidsVar([]);
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              ))}
            </SimpleGrid>
            {invalidOpts.length >= 1 && (
              <Box color="#EE8081">some options fields are empty</Box>
            )}
            <Box color="#EE8081">
              {" "}
              {invalids.indexOf("valid") !== -1 && "tick your valid option"}
            </Box>
            <FormControl mt="7">
              <Flex alignItems="center">
                <FormLabel>Image</FormLabel>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => imageModalVar(true)}
                >
                  {image === null ? "Upload" : "Replace"}
                </Button>
                {image && (
                  <Button
                    ml={3}
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      imageVar(null);
                      editTaskVar({ ...editTask, img: null });
                    }}
                  >
                    Remove
                  </Button>
                )}
              </Flex>

              {image && (
                <Img
                  mt={3}
                  width="20%"
                  height="20%"
                  src={
                    image && imageblob
                      ? image
                      : `https://krowdee-prime-123.s3.amazonaws.com/${image}`
                  }
                />
              )}
              <FormHelperText>images are optional</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={taskUploading}
              isDisabled={taskUploading}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={handleClose} bgColor="red.500">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={closeDialog}
        isOpen={taskExist[0].length > 0}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>force Task upload?</AlertDialogHeader>
          <AlertDialogCloseButton onClick={closeDialog} />
          <AlertDialogBody>
            <Box>similar task/tasks already exist:</Box>

            {taskExist[0].map((task) => (
              <div key={task._id}>
                <Badge colorScheme="green">{task.txt}</Badge>
                <Badge colorScheme="blue">{task.cat}</Badge>
              </div>
            ))}
            <Box> Do you still want to upload it?</Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={closeDialog}>No</Button>
            <Button
              colorScheme="red"
              isLoading={taskForceUploading}
              isDisabled={taskForceUploading}
              ml={3}
              onClick={() => {
                forceTaskUpload();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ImageUploadModal />
    </form>
  );
}

export default TaskModal;
