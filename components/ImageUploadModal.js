import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import AvatarEditor from "react-avatar-editor";
import {
  imageModalVar,
  imageVar,
  imagePreviewVar,
  imageblobVar,
} from "../state/local";
import { useReactiveVar } from "@apollo/client";

function ImageUploadModal() {
  //react states
  const [editor, setEditor] = useState("");

  const imagePreview = useReactiveVar(imagePreviewVar);
  const imageModal = useReactiveVar(imageModalVar);

  //component functions
  const closeModal = () => {
    imageModalVar(false);
    imagePreviewVar(null);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        imagePreviewVar(reader.result);
      });
    }
  };

  const handleCropImage = () => {
    if (editor) {
      editor.getImage().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        imageVar(imageUrl);
        imageblobVar(blob);
        imageModalVar(false);
        imagePreviewVar(null);
      });
    }
  };

  return (
    <>
      <Modal isOpen={imageModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <InputGroup>
                <Input
                  // height="250px"
                  type="file"
                  fontSize="sm"
                  textAlign="center"
                  py={3}
                  placeholder="Click to select an image"
                  size="lg"
                  onChange={handleImageChange}
                />
              </InputGroup>
            </FormControl>
            {imagePreview && (
              <Flex align="center" justify="center">
                {" "}
                <AvatarEditor
                  image={imagePreview}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1}
                  rotate={0}
                  ref={(node) => setEditor(node)}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={handleCropImage}>
              Crop
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageUploadModal;
