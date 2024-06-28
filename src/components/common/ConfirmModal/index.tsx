import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  ModalProps,
  useColorMode,
  ButtonProps,
} from '@chakra-ui/react';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmButtonProps?: ButtonProps;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirm,
  title,
  description,
  onClose,
  confirmButtonProps,
  ...otherProps
}) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isCentered={true} onClose={onClose} {...otherProps}>
      <ModalOverlay bg={colorMode === "dark" ? "rgba(35, 38, 39, 0.90)" : undefined} />
      <ModalContent
        borderRadius="24px"
        maxWidth="504px"
        p={["30px 20px", "40px 20px", "48px 40px"]}
        boxSizing='content-box'
        backgroundColor={colorMode === "dark" ? "neutral.100" : undefined}
      >
        <ModalHeader
          color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
          textAlign="center"
          fontFamily="Roboto"
          fontSize="20px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="28px"
          py="0"
        >{title}</ModalHeader>
        <ModalBody pt="16px" pb="0">
          <Text
            color="neutral.50"
            textAlign="center"
            fontFamily="Roboto"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
          >{description}</Text>
        </ModalBody>
        <ModalFooter pt="40px" pb="0" display="flex" width="100%" alignItems="center" justifyContent="center" gap="24px">
          {/* <Box display="flex" width="100%" alignItems="center" justifyContent="center" gap="24px"> */}
            <Button
              onClick={onConfirm}
              borderRadius="10px"
              colorScheme="blue"
              color="neutral.10"
              fontSize="16px"
              fontFamily="Roboto"
              fontWeight="500"
            height="48px"
              lineHeight="24px"
              minWidth="107px"
              p="12px 0"
              bg="red"
              {...confirmButtonProps}
            >Yes</Button>
            <Button
              onClick={onClose}
              borderRadius="10px"
              color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
              fontSize="16px"
              fontFamily="Roboto"
              fontWeight="500"
              lineHeight="24px"
              py="12px"
            minWidth="107px"
              height="48px"
              bg={colorMode === "dark" ? "neutral.80" : undefined}
            >Cancel</Button>
          {/* </Box> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModal;