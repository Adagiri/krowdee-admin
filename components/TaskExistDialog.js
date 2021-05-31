import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import React from "react";

function TaskExistDialog({ TaskExistDialogOpen }) {
  const { isOpen:teOpen, onOpen, onClose: teClose } = useDisclosure();
  const teCancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={teCancelRef}
        onClose={teClose}
        isOpen={teOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
           A similar task already exist:
           <Box>{currentTask.txt}</Box>
Do you still want to upload it?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TaskExistDialog;
