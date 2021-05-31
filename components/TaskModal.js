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
  blobVar,
  imageModalVar,
  catVar,
  imageVar,
  taskModalVar,
  editTaskVar,
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
import client from "../apollo-client";
import ImageUploadModal from "./ImageUploadModal";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  BLOB,
  CAT,
  EDIT_TASK,
  IMAGE,
  TASK_MODAL,
  USER,
} from "../state/local/utils";

import { GET_S3_URL, GET_TASKS } from "../state/remote/queries";
import { getSignedUrl, resetFileUpload } from "../helper/files";
import { Select } from "@chakra-ui/select";

import { makeid } from "../helper/ids";
import { useDisclosure } from "@chakra-ui/hooks";
import { getToken, getUser } from "../helper/auth";
import axios from "axios";
import { ADD_TASK, EDIT_TASK_REMOTE } from "../state/remote/mutations";

let arr = [
  { _id: makeid(4), opt: "" },
  { _id: makeid(4), opt: "" },
];

function TaskModal({ refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = getUser()._id;

  //alert hook==================================================================start
  const alert = useAlert();

  //apollo client================================================================start

  //task to edit
  const {
    data: { taskToEdit },
  } = useQuery(EDIT_TASK);

  console.log(taskToEdit);

  //image
  const {
    data: { image },
  } = useQuery(IMAGE);

  //blob
  const {
    data: { blob },
  } = useQuery(BLOB);

  //task modal
  const {
    data: { taskModal },
  } = useQuery(TASK_MODAL);

  //add task
  const [addTask, {}] = useMutation(ADD_TASK);

  //edit task
  const [editTask, {}] = useMutation(EDIT_TASK_REMOTE);

  //react hooks============================================================================start

  //state
  const [txt, setText] = useState("");
  const [opts, setOpts] = useState(arr);
  const [cat, setCat] = useState("");
  const [valid, setValid] = useState("");
  const [invalid, setInvalid] = useState([]);
  const [optInvalids, setOptInvalids] = useState([]);
  const [_id, setId] = useState("");
  const [img, setImg] = useState("");
  const [imge, setImge] = useState(false);
  const [taskExist, setTaskExist] = useState([]);
  const [taskExistDialog, setTaskExistDialog] = useState(false);

  //ref
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  //effect
  useEffect(() => {
    if (taskToEdit) {
      console.log(taskToEdit);
      setText(taskToEdit.txt);
      setValid(taskToEdit.valid);
      setOpts(
        taskToEdit.opts.map((opt) => {
          return { _id: opt._id, opt: opt.opt };
        })
      );
      // console.log(taskToEdit.opts.map((opt) => {
      //   opt._id, opt.opt;
      // }))
      setCat(taskToEdit.cat.charAt(0).toUpperCase() + taskToEdit.cat.slice(1));
      setImge(taskToEdit.img);
    }
    setId(getUser()._id);
    return () => {
      // editTaskVar(false);
    };
  }, [taskToEdit, img]);

  //functions============================================================================start
  let variables = { cat: cat.toLowerCase(), img, opts, valid, txt };

  const handleValidChange = (_id) => {
    setInvalid([]);
    setValid(_id);
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptInvalids([]);
    setOpts(
      opts.map((item) => (item._id === name ? { ...item, opt: value } : item))
    );
  };

  const handleClose = (e) => {
    resetFileUpload();
    setText("");
    setValid("");
    setOpts(arr);
    setText("");
    setCat("");
    imageVar(false);
    onClose();
    taskModalVar(false);
  };

  const handleSubmit = async () => {
    try {
      variables = { ...variables, force: false };
      setInvalid([]);
      if (!validateFields()) {
        return "";
      }

      if (blob) {
        //generate image url
        const signedUrl = await axios.post(
          "http://localhost:9000/graphql",
          {
            query: `
        query GetS3Url {
          getSignedUrl(input: { _id: "${_id}", contentType: "${blob.type}" }) {
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
        const imgUrl = signedUrl.data.data.getSignedUrl.url;
        setImg(imgUrl);
        //upload the image file
        const uploadImg = await axios.put(imgUrl, blob, {
          headers: {
            "Content-Type": blob.type,
          },
        });
        console.log(uploadImg);
        //upload task
        handleTaskUpload();
      }

      handleTaskUpload();
    } catch (error) {
      console.log(error);
    }
  };

  const validateFields = () => {
    //CHECK IF CATEGORY IS NOT SET

    if (cat === "") {
      alert.show("category not set", { type: "error" });
      setInvalid([...invalid, "cat"]);

      return false;
    }

    //CHECK IF TEXT IS NOT SET or too short
    else if (txt === "" || txt.length < 5) {
      alert.show("question is too short", { type: "error" });
      setInvalid([...invalid, "txt"]);
      return false;
    }

    //CHECK IF ANY OPTION IS EMPTY
    else if (opts.find((opt) => opt.opt === "")) {
      opts.forEach(async (opt) => {
        if (opt.opt === "") {
          await setOptInvalids([opt._id, ...optInvalids]);
          setInvalid([...invalid, "opts"]);
        }
      });
      alert.show("an option isn't set", { type: "error" });
      return false;
    }

    //CHECK IF VALID WAS NOT SET
    else if (valid === "") {
      alert.show("Tick a valid option", { type: "error" });
      setInvalid([...invalid, "valid"]);
      return false;
    } else {
      return true;
    }
  };

  //force task upload handler
  const forceTaskUpload = async () => {
    variables = { ...variables, force: true };
    await handleTaskUpload();
    setTaskExistDialog(false);
  };

  //task upload handler
  const handleTaskUpload = () => {
    console.log(taskToEdit);
    if (taskToEdit) {
      editTask({
        variables: { ...variables, _id: taskToEdit._id },
      })
        .then((data) => {
          if (data.data.editTask.success === true) {
            alert.show("Task edited", { type: "success" });
            taskModalVar(false);
            refetch();
          }
        })
        .catch((error) => {
          alert.show(error.message, { type: "error" });
        });
    } else {
      addTask({
        variables,
      })
        .then((data) => {
          if (data.data.addTask.success === false) {
            setTaskExist(data.data.addTask.taskExist);
            setTaskExistDialog(true);
          } else {
            alert.show("Task added", { type: "success" });
            setOpts(arr)
            setValid("")
            setText("")
            refetch();
          }
        })
        .catch((error) => {
          alert.show(error.message, { type: "error" });
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
          <ModalHeader>{taskToEdit ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              taskModalVar(false);
              onClose();
            }}
          />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={invalid.indexOf("cat") !== -1}>
              <FormLabel>Category</FormLabel>
              <Select
                value={cat}
                onChange={(e) => {
                  setCat(e.target.value);
                  setInvalid([]);
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
                {invalid.indexOf("cat") !== -1 && "category not set"}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              mt={4}
              isRequired
              isInvalid={invalid.indexOf("txt") !== -1}
            >
              <FormLabel>Text</FormLabel>
              <Input
                value={txt}
                onChange={(e) => {
                  setText(e.target.value);
                  setInvalid([]);
                }}
                ref={initialRef}
                placeholder="task question"
              />
              <FormErrorMessage>
                {invalid.indexOf("txt") !== -1 && "text too short"}
              </FormErrorMessage>
            </FormControl>

            <Box d="flex" pt="3" my={3} alignItems="center">
              <chakra.span fontSize="md">Options</chakra.span>
              <IconButton
                size="xs"
                ml={2}
                icon={<BiMinus />}
                onClick={() => {
                  opts.length > 2 && setOpts(opts.slice(0, -1));
                  setValid("");
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
                    setOpts([...opts, { _id: makeid(4), opt: "" }]);
                  setValid("");
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
                          name={option._id}
                          onClick={() => handleValidChange(option._id)}
                          // bg={option._id === valid && "#fff"}
                          color={option._id === valid && "#51ff0d"}
                        />
                      </InputRightAddon>{" "}
                      <Input
                        placeholder="type option"
                        value={option.opt}
                        name={option._id}
                        isRequired
                        isInvalid={optInvalids.indexOf(option._id) !== -1}
                        onChange={handleOptionChange}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              ))}
            </SimpleGrid>
            {optInvalids.length >= 1 && (
              <Box color="#EE8081">some options fields are empty</Box>
            )}
            <Box color="#EE8081">
              {" "}
              {invalid.indexOf("valid") !== -1 && "tick your valid option"}
            </Box>
            <FormControl mt="7">
              <Flex alignItems="center">
                <FormLabel>Image</FormLabel>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => imageModalVar(true)}
                >
                  {image === false ? "Upload" : "Replace"}
                </Button>
                {image && (
                  <Button
                    ml={3}
                    size="sm"
                    color="red"
                    onClick={() => imageVar(false)}
                  >
                    Remove
                  </Button>
                )}
              </Flex>

              {imge && <Img mt={3} width="40%" height="40%" src={imge} />}
              <FormHelperText>images are optional</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
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
        onClose={() => setTaskExistDialog(false)}
        isOpen={taskExistDialog}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton onClick={() => setTaskExistDialog(false)} />
          <AlertDialogBody>
            <Box>similar task/tasks already exist:</Box>

            {taskExist.map((task) => (
              <Badge colorScheme="blue">{task.txt}</Badge>
            ))}
            <Box> Do you still want to upload it?</Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setTaskExistDialog(false)}>No</Button>
            <Button colorScheme="red" ml={3} onClick={() => forceTaskUpload()}>
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
