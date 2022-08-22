import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Displays a loading element on top of all other elements in the app
 * disabling user interaction until the loading is done.
 */

const LoadingOverlay = (): JSX.Element => {
  return (
    <Modal
      isCentered
      isOpen
      onClose={() => null}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="xs"
    >
      <ModalOverlay bg="loading.overlayBg" />
      <ModalContent bg="transparent" boxShadow="none">
        {/* <ModalHeader>
        </ModalHeader> */}
        <ModalBody border="0px">
          <Box h="100%" w="100%" textAlign="center">
            <LoadingSpinner />
          </Box>
        </ModalBody>
        {/* <ModalFooter>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default LoadingOverlay;
