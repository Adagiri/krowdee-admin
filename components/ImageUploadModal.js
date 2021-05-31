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
  blobVar,
  imageModalVar,
  imageVar,
  previewImageVar,
} from "../state/local";

import { IMAGE, IMAGE_MODAL, PREVIEW_IMAGE } from "../state/local/utils";
import { useQuery } from "@apollo/client";



function ImageUploadModal() {
  //react states
  const [editor, setEditor] = useState("");

  //apollo-client-hooks
  const {
    data: { imageModal },
  } = useQuery(IMAGE_MODAL);

  const {
    data: { previewImage },
  } = useQuery(PREVIEW_IMAGE);

  //component functions
  const closeModal = () => {
    imageModalVar(false);
    previewImageVar("");
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        previewImageVar(reader.result);
      });
    }
  };

  const handleCropImage = () => {
    if (editor) {
      editor.getImage().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
console.log(blob.type.slice(6))
        imageVar(imageUrl);
        blobVar(blob);
        imageModalVar(false);
        previewImageVar("");
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
            {previewImage && (
              <Flex align="center" justify="center">
                {" "}
                <AvatarEditor
                  image={previewImage}
                  width={200}
                  height={200}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
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
