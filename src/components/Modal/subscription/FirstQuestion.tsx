import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DowngradeAnswers } from "src/types";

interface Props {
  handleNext: () => void;
  setAnswers: React.Dispatch<React.SetStateAction<DowngradeAnswers>>;
  answers: DowngradeAnswers;
  loadingUserSetting: boolean;
}

const FirstQuestion = ({
  handleNext,
  answers,
  setAnswers,
  loadingUserSetting,
}: Props) => {
  const secondaryTextColor = useColorModeValue("neutral.80", "neutral.20");

  function handleChange(nextValue: string) {
    setAnswers((prev) => ({
      ...prev,
      why: nextValue,
    }));
  }

  return (
    <>
      <ModalBody>
        <FormControl>
          <FormLabel mb={"20px"}>
            <Text fontSize={"3xl"} textAlign={"center"}>
              Are you sure you want to downgrade your subscription?
            </Text>
            <Text
              textAlign={"center"}
              color={secondaryTextColor}
              fontWeight={"normal"}
            >
              Could you share your reasons for wanting to downgrade?
            </Text>
          </FormLabel>

          <RadioGroup
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            value={answers.why}
            onChange={handleChange}
          >
            <Radio value="missing_features" gap={2}>
              Missing Features
            </Radio>
            <Radio value="no_longer_needed" gap={2}>
              No Longer Needed
            </Radio>
            <Radio value="technical_issues" gap={2}>
              Technical Issues
            </Radio>
            <Radio value="budge" gap={2}>
              Budget
            </Radio>
            <Radio value="other" gap={2}>
              Other
            </Radio>
          </RadioGroup>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          onClick={handleNext}
          isDisabled={!answers.why || loadingUserSetting}
        >
          Next
        </Button>
      </ModalFooter>
    </>
  );
};

export default FirstQuestion;
