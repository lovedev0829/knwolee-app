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
  ButtonProps,
  useColorModeValue,
  Container,
  Flex,
} from "@chakra-ui/react";
import BuyCreditsCard from "./SubscriptionLimit/BuyCreditsCard";

interface Props extends Omit<ModalProps, "children"> {
  onConfirm: () => void;

  confirmButtonProps?: ButtonProps;
}

function CreditManager({
  onConfirm,
  onClose,
  confirmButtonProps,
  ...otherProps
}: Props) {
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const backgroundColor = useColorModeValue(undefined, "neutral.100");
  const cancelButtonBGColor = useColorModeValue(undefined, "neutral.80");
  const modalOverlayBGColor = useColorModeValue(
    undefined,
    "rgba(35, 38, 39, 0.90)"
  );

  const borderColor = useColorModeValue("neutral.30", "neutral.80");
  return (
    <Modal isCentered={true} onClose={onClose} {...otherProps}>
      <ModalOverlay bg={modalOverlayBGColor} />
      <ModalContent
        borderRadius="24px"
        maxWidth="504px"
        p={["10px 10px", "10px 10px", "28px"]}
        boxSizing="content-box"
        backgroundColor={backgroundColor}
      >
        <ModalHeader
          color={headingTextColor}
          textAlign="center"
          fontFamily="Roboto"
          fontSize="32px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="28px"
          py="0"
        >
          Buy more credits
        </ModalHeader>
        <ModalBody pt="16px" pb="0">
          <Text
            color="neutral.50"
            textAlign="center"
            fontFamily="Roboto"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            marginBottom={4}
          >
            Pay what you consume 
          </Text>
          <BuyCreditsCard />
        </ModalBody>
        <ModalFooter
          pt="40px"
          pb="0"
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="12px"
        >
          <Button
            onClick={onClose}
            borderRadius="10px"
            color={headingTextColor}
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="500"
            lineHeight="12px"
            py="12px"
            minWidth="107px"
            height="48px"
            bg={cancelButtonBGColor}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreditManager;
