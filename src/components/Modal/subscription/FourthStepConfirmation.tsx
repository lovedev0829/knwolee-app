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
} from "@chakra-ui/react";
import { DowngradeAnswers } from "src/types";

interface Props {
  handleNext: () => void;
  handleGoBack: () => void;
  setAnswers: React.Dispatch<React.SetStateAction<DowngradeAnswers>>;
  answers: DowngradeAnswers;
}

const FourthStepConfirmation = ({ handleNext, handleGoBack }: Props) => {
  const secondaryTextColor = useColorModeValue("neutral.80", "neutral.20");
  const secondaryBackgroundColor = useColorModeValue("blue.50", "blue.800");

  return (
    <>
      <ModalBody>
        <FormControl>
          <Box>
            <Box mb={"20px"}>
              <Text fontSize={"3xl"} textAlign={"center"}>
                Everything is ready. Here’s what to expect next.
              </Text>
              <Text
                textAlign={"center"}
                color={secondaryTextColor}
                fontWeight={"normal"}
              >
                After your billing period ends, access to premium features will be discontinued.
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
              <Text fontWeight={"bold"}>
                Please note: you will lose any active discounts.
              </Text>
            </Flex>
          </Box>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} onClick={handleGoBack}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleNext}>
          Confirm & Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

export default FourthStepConfirmation;
