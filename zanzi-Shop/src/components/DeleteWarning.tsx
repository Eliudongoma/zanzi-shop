import {
  Button,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { useCustomColor } from "../hooks/useCustomColor";

interface DeleteWarningProps {
  isOpen: boolean; // Controls whether the dialog is open
  onClose: () => void; // Closes the dialog
  onConfirm: () => void; // Confirms the deletion
  itemName?: string; // Name of the item to display in the warning
}

const DeleteWarning = ({ isOpen, onClose, onConfirm, itemName }: DeleteWarningProps) => {
  const {textColor, buttonBg, buttonText} = useCustomColor();
  return (
    <Dialog.Root
      open={isOpen} // Controlled by isOpen prop
      onOpenChange={(open) => !open && onClose()} // Calls onClose when dialog closes
      placement="top"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
          <Dialog.CloseTrigger asChild alignSelf={"flex-end"}>
                <CloseButton size="sm" onClick={onClose} />
              </Dialog.CloseTrigger>
              <Dialog.Header>
                <Dialog.Title fontSize={"40px"} color={textColor}>{itemName ? "Remove Item" : "Clear Cart"} </Dialog.Title>
              </Dialog.Header>
              
            <Dialog.Body color={textColor} fontSize={"15px"}>
              {itemName ? <p>
                Are you sure you want to remove <strong>{itemName}</strong> from your cart?
              </p> : <p>Are you sure you want to clear your cart?</p>}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose} color={textColor}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button color={buttonText} bg={buttonBg} onClick={onConfirm}>
              {itemName ? "Remove" : "Clear"}
              </Button>
            </Dialog.Footer>
            
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteWarning;