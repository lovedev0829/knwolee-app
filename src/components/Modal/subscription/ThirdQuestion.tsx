import React, { ChangeEvent } from "react";
import {
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { DowngradeAnswers } from "src/types";

interface Props {
  handleNext: () => void;
  handleGoBack: () => void;
  setAnswers: React.Dispatch<React.SetStateAction<DowngradeAnswers>>;
  answers: DowngradeAnswers;
  loadingUserSetting: boolean;
}

const ThirdQuestion = ({
  handleNext,
  handleGoBack,
  answers,
  setAnswers,
  loadingUserSetting,
}: Props) => {
  const secondaryTextColor = useColorModeValue("neutral.80", "neutral.20");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswers((prev) => ({
      ...prev,
      suggestion: e.target.value,
    }));
  }

  return (
    <>
      <ModalBody>
        <FormControl>
          <FormLabel mb={"20px"}>
            <Text fontSize={"3xl"} textAlign={"center"}>
              Is there anything we could improve?
            </Text>
            <Text
              textAlign={"center"}
              color={secondaryTextColor}
              fontWeight={"normal"}
            >
              We value your feedback as it helps us enhance our services.
            </Text>
          </FormLabel>
          <Textarea
            value={answers.suggestion || ""}
            placeholder="Your feedback matters to us — every response is read"
            onChange={handleChange}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} onClick={handleGoBack} isDisabled={loadingUserSetting}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleNext}>
          Next
        </Button>
      </ModalFooter>
    </>
  );
};

export default ThirdQuestion;
