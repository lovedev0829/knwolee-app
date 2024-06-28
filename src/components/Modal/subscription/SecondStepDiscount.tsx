import React from "react";
import {
  FormControl,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useColorModeValue,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useStripeAcceptSpecialDiscountOfferMutation } from "src/api/mutations/stripeIndex";
import {
  useBillingManagerModalStore,
  useSubscriptionModalStore,
} from "src/store";
import { DowngradeAnswers } from "src/types";

interface Props {
  handleNext: () => void;
  handleGoBack: () => void;
  setAnswers: React.Dispatch<React.SetStateAction<DowngradeAnswers>>;
  answers: DowngradeAnswers;
  onClose: () => void;
}

const SecondStepDiscount = ({
  handleNext,
  handleGoBack,
  onClose: onCloseDowngradeQuestionModal,
}: Props) => {
  const toast = useToast();
  const secondaryTextColor = useColorModeValue("neutral.80", "neutral.20");
  const secondaryBackgroundColor = useColorModeValue("blue.50", "blue.800");
  const declineButtonColorScheme = useColorModeValue("blackAlpha", undefined);
  const { close } = useSubscriptionModalStore();
  const { close: closeBillingManagerModal } = useBillingManagerModalStore();

  const { mutateAsync: acceptSpecialOffer, isLoading } =
    useStripeAcceptSpecialDiscountOfferMutation();

  async function handleAcceptSpecialOffer() {
    await acceptSpecialOffer();
    // close the parent modal
    close();
    closeBillingManagerModal();
    onCloseDowngradeQuestionModal();
    toast({
      title: "Discount Accepted Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <ModalBody>
        <FormControl>
          <Box>
            <Box mb={"20px"}>
              <Text fontSize={"3xl"} textAlign={"center"}>
                The next month almost for free.
              </Text>
              <Text
                textAlign={"center"}
                color={secondaryTextColor}
                fontWeight={"normal"}
              >
                Need a little more time to see the value in Knowlee? Enjoy your next month with a 90% discount! (Please note this offer is valid only for monthly subscriptions).
              </Text>
            </Box>
            <Flex
              justify={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={"12px"}
              background={secondaryBackgroundColor}
              rounded={"lg"}
              padding={"12px"}
            >
              <Text fontSize={"14px"}>Claim your limited-time offer:</Text>
              <Text fontSize={"28px"} fontWeight={"bold"}>
                90% off for 1 month
              </Text>
              <Button
                colorScheme="blue"
                onClick={handleAcceptSpecialOffer}
                isLoading={isLoading}
              >
                Accept This Offer
              </Button>
            </Flex>
          </Box>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} onClick={handleGoBack}>
          Back
        </Button>
        <Button colorScheme={declineButtonColorScheme} onClick={handleNext}>
          Decline Offer
        </Button>
      </ModalFooter>
    </>
  );
};

export default SecondStepDiscount;
