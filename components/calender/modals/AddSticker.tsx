import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { format } from "date-fns";

interface AddStickerProps {
  isOpen: boolean;
  updateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
}

/**
 * Handles adding and modifying the stickers for the given month.
 * @param props the props for this component.
 * @param {boolean} props.isOpen tells the component when the modal should be open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.updateIsOpen used to close the modal.
 * @param {date} props.date the date for which the sticker will be added or modified.
 */
const AddSticker = (props: AddStickerProps): JSX.Element => {
  const { isOpen, updateIsOpen, date } = props;

  // TODO: Import the stickers array from the calender context.

  // TODO: Add a function that will add or update the sticker for the current date.

  /**
   * TODO: Add logic into the contents of the modal to show messages if the selected date is out of range.
   * Show a message when a date in the future is selected.
   * Show a message when a date before the current date is selected.
   */

  return (
    <Fragment>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => updateIsOpen(!isOpen)}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading textAlign="center" as="h2" size="md" w="100%">
              {format(date, "LLLL do, y")}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => updateIsOpen(!isOpen)}
            >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddSticker;
