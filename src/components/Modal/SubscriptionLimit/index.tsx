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
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import UpgradePlanCard from "./UpgradePlanCard";
import BuyCreditsCard from "./BuyCreditsCard";
// import UpgradePlanCard from "./UpgradePlanCard";
// import BuyCreditsCard from "./BuyCreditsCard";

function SubscriptionLimit({
  onClose,
  ...otherProps
}: Omit<ModalProps, "children">) {
  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const backgroundColor = useColorModeValue(undefined, "neutral.100");
  const cancelButtonBGColor = useColorModeValue(undefined, "neutral.80");
  const modalOverlayBGColor = useColorModeValue(
    undefined,
    "rgba(35, 38, 39, 0.90)"
  );
  const subHeadingColor = useColorModeValue("#6C7275", "#6C7275");
  return (
    <Modal isCentered={true} onClose={onClose} {...otherProps}>
      <ModalOverlay bg={modalOverlayBGColor} />
      <ModalContent
        borderRadius="24px"
        maxWidth="620px"
        p={["30px 20px", "40px 20px", "48px 40px"]}
        boxSizing="content-box"
        backgroundColor={backgroundColor}
      >
        <ModalHeader
          color={headingTextColor}
          textAlign="center"
          fontFamily="Roboto"
          fontSize="28px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="28px"
          py="0"
        >
          Subscription limit reached.
        </ModalHeader>
        <ModalBody px="0" pt="16px" pb="0">
          <Text
            color={subHeadingColor}
            textAlign="center"
            fontFamily="Roboto"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
          >
            You've reached the limit of your current subscription plan. To
            continue enjoying uninterrupted access to our services, consider one
            of the following options:
          </Text>

          <Flex gap="28px" mt="4" flexDirection={{ sm: "column", md: "row" }}>
            <UpgradePlanCard />
            <BuyCreditsCard />
          </Flex>
        </ModalBody>
        <ModalFooter
          pt="40px"
          pb="0"
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="24px"
        >
          <Button
            onClick={onClose}
            borderRadius="10px"
            color={headingTextColor}
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="500"
            lineHeight="24px"
            py="28px"
            px="52px"
            minWidth="107px"
            height="40px"
            bg={cancelButtonBGColor}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SubscriptionLimit;
