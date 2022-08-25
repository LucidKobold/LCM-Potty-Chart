import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface ImageUploadModalProps {
  image: string;
  name: string;
  loading: boolean;
  isSubmitting: boolean;
  formInvalid: boolean;
  newImage: string;
  setNewImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploadModal = ({
  image,
  name,
  // loading,
  isSubmitting,
  // formInvalid,
  newImage,
  setNewImage
}: ImageUploadModalProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // // Image from the input.
  // const [file, setFile] = useState<File | File[] | null>(null);

  // // Handle the image input.
  // const handleImageInput = (
  //   files: FileList | React.SetStateAction<File | File[] | null>[] | null
  // ): void => {
  //   if (files !== null) {
  //     const file = files[0];
  //     setFile(file);
  //   }
  // };

  // * Handle resetting the image
  // ! Remove when adding headless CMS functions.
  const resetImage = (): void => {
    setNewImage(image);
  };

  const [showNewImagePreview, setShowNewImagePreview] =
    useState<boolean>(false);

  // Field theme
  const fieldTheme = {
    width: "100%",
    bg: "gray.900",
    borderColor: "white",
    _placeholder: {
      color: "white"
    },
    _focus: {
      bg: "#000",
      color: "#FFF",
      borderColor: "#63b3ed",
      boxShadow: "0 0 0 1px #63b3ed",
      zIndex: "1"
    }
  };

  return (
    <Box w="100%" h="auto">
      <VStack
        w="100%"
        h="auto"
        alignContent="center"
        justifyContent="center"
        spacing={0}
      >
        <Avatar
          name={name}
          size="xl"
          src={showNewImagePreview ? newImage : image}
        />
        <Box
          position="absolute"
          h="6rem"
          w="6rem"
          bg="black"
          pt="-2rem"
          opacity={0.6}
          borderRadius="50%"
          onClick={onOpen}
          _hover={{
            cursor: "pointer"
          }}
        >
          <Box position="absolute" top="35%" left="35%">
            <Icon fontSize="2rem" icon="ph:note-pencil-fill" />
          </Box>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" as="h1">
            {"Update Profile Picture"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              w="100%"
              h="auto"
              alignContent="center"
              justifyContent="center"
              spacing={6}
            >
              <VStack
                w="100%"
                h="auto"
                alignContent="center"
                justifyContent="center"
                spacing={4}
              >
                <Heading as="h2" fontSize="3xl">
                  {"Current Image"}
                </Heading>
                <Avatar name={name} size="xl" src={image} />
              </VStack>
              <VStack
                w="100%"
                h="auto"
                alignContent="center"
                justifyContent="center"
                spacing={4}
              >
                <Heading as="h2" fontSize="3xl">
                  {"New Image"}
                </Heading>
                <Avatar name={name} size="xl" src={newImage} />
                <FormLabel htmlFor="image" width="max-content">
                  {"Image URL"}
                </FormLabel>
                <Input
                  required
                  {...fieldTheme}
                  type="text"
                  id="image"
                  name="image"
                  placeholder="https://domain.com/image.jpg"
                  value={newImage}
                  onChange={(e) => {
                    setNewImage(e.target.value);
                  }}
                  isDisabled={isSubmitting}
                />
                <HStack my={2} alignContent="center" justifyContent="center">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => resetImage()}
                    isDisabled={isSubmitting}
                  >
                    <Icon fontSize="2rem" icon="ph:x-circle-fill" />
                  </Button>
                  <Button
                    isDisabled={isSubmitting}
                    variant="submit"
                    type="button"
                    onClick={() => {
                      setShowNewImagePreview(true);
                      onClose();
                    }}
                    isLoading={isSubmitting}
                  >
                    <Icon fontSize="2rem" icon="ph:check-circle-fill" />
                  </Button>
                </HStack>
              </VStack>
            </VStack>
            {/* <VStack>
              <FormLabel
                htmlFor="image"
                bg="whiteAlpha.200"
                width="max-content"
                rounded="md"
                px={2}
                py={2}
                my={4}
                mx="auto"
                textAlign="center"
                _hover={{
                  bg: useColorModeValue("#005099;", "#005099"),
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <Skeleton isLoaded={!loading}>
                  {file ? "Change your image" : "Upload a custom image"}
                </Skeleton>
              </FormLabel>
              <VisuallyHidden>
                <Input
                  isDisabled={isSubmitting}
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={(e) => handleImageInput(e.target.files)}
                />
              </VisuallyHidden>
              <Collapse in={file ? true : false} animateOpacity>
                <Fragment>
                  {file && (
                    <VStack
                      my={2}
                      alignContent="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={
                          Array.isArray(file) ? "" : URL.createObjectURL(file)
                        }
                        name={Array.isArray(file) ? "" : file.name}
                        size="xl"
                      />
                      <Text color="gray.300">
                        {Array.isArray(file) ? "" : file.name}
                      </Text>
                    </VStack>
                  )}
                  <HStack my={2} alignContent="center" justifyContent="center">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      isDisabled={isSubmitting}
                    >
                      <Icon fontSize="2rem" icon="ph:x-circle-fill" />
                    </Button>
                    <Button
                      isDisabled={isSubmitting || formInvalid}
                      variant="submit"
                      type="button"
                      onClick={(e) => {
                        // e.preventDefault();
                        // if (file) {
                        //   setIsSubmitting(true);
                        //   handleUpload(file);
                        // }
                      }}
                      isLoading={isSubmitting}
                    >
                      <Icon fontSize="2rem" icon="ph:check-circle-fill" />
                    </Button>
                  </HStack>
                </Fragment>
              </Collapse>
            </VStack> */}
          </ModalBody>
          <ModalFooter>{/* <Button>{"Finish"}</Button> */}</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageUploadModal;
