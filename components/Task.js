import { Badge, Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useAlert } from "react-alert";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../state/remote/mutations";
import {
  catVar,
  editTaskVar,
  imageVar,
  optsVar,
  taskModalVar,
  txtVar,
  validVar,
} from "../state/local";

function Task({ task, refetch }) {
  //alert component
  const alert = useAlert();
  //apollo-client
  const [deleteTask, { loading: deleteTaskLoading, error: deleteTaskError }] =
    useMutation(DELETE_TASK);
  //chakra ui
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  if (deleteTaskError)
    alert.show(error, {
      type: "error",
    });

  const handleDeleteTask = () => {
    deleteTask({
      variables: { taskId: task._id },
    }).then((data) => {
      onClose();
      alert.show("Task deleted", { type: "success" });
      refetch();
    });
  };

  return (
    <Box
      // maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      // maxWidth="300px"
      overflow="hidden"
    >
      <Box width="100%" p="2">
        <Box
          width="100%"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex>
            {" "}
            <Badge mr="2" borderRadius="full" px="2" colorScheme="teal">
              {task.cat}
            </Badge>
            <Tooltip hasArrow label="edit Task" fontSize="md">
              <span>
                <BiEditAlt
                  color="#4AA3B6"
                  cursor="pointer"
                  onClick={() => {
                    editTaskVar(task);
                    catVar(
                      task.cat[0].toUpperCase() +
                        task.cat.slice(1).toLowerCase()
                    );
                    imageVar(task.img && task.img);
                    txtVar(task.txt);
                    optsVar(
                      task.opts.map((opt) => {
                        return { opt: opt.opt, _id: opt._id };
                      })
                    );
                    validVar(task.valid);
                    taskModalVar(true);
                  }}
                />
              </span>
            </Tooltip>
          </Flex>
          <Tooltip label="delete Task" fontSize="md">
            <span>
              <BsTrash cursor="pointer" color="red" onClick={onOpen} />
            </span>
          </Tooltip>
        </Box>
        <Text
          mt="1.5"
          // fontWeight="semibold"
          fontSize="1xs"
          lineHeight="tight"
          isTruncated
        >
          {task.txt}
        </Text>
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Badge mr="2" borderRadius="full" px="2" colorScheme="teal">
              {task.cat}
            </Badge>
            <Text fontSize="1xs">{task.txt}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              isLoading={deleteTaskLoading}
              isDisabled={deleteTaskLoading}
              colorScheme="red"
              ml={3}
              onClick={handleDeleteTask}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}

export default Task;
