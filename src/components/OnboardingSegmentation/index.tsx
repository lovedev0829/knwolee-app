/* eslint-disable react-refresh/only-export-components */
import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateSegmentationMutation } from "../../api/mutations/userIndex";
import {
  Goals,
  Professions,
  QuestionErrors,
  QuestionSegmentKeys,
  SegmentationQuestionKey,
  SegmentationQuestions,
  Support,
} from "../../types/user.segmentation";
import {
  DEFAULT_USER_SEGMENTATION,
  PROFESSIONS_SEGMENTATION_TEXT,
  SEGMENTATION_TEXT,
} from "../../utils/constants";
import SubmitButton from "../common/Buttons/SubmitButton";

interface OnboardingSegmentationProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingSegmentation: React.FC<OnboardingSegmentationProps> = ({
  isOpen,
  onClose,
}) => {
  const borderColor = useColorModeValue("neutral.30", "#343839");
  const titleTextColor = useColorModeValue("neutral.100", "neutral.10");
  const optionsTextColor = useColorModeValue("neutral.80", "neutral.20");
  const modalOverlayBgColor = useColorModeValue(undefined, "rgba(35, 38, 39, 0.90)");
  const modalContentBgColor = useColorModeValue(undefined, "neutral.100");
  const scrollbarTrackBgColor = useColorModeValue("primary.10", "neutral.90");

  const userSegmentationMutation = useCreateSegmentationMutation();

  const customScrollbar = {
    "&::-webkit-scrollbar": {
      width: "4px",
      marginLeft: "28px",
    },
    // "&::-webkit-scrollbar-track": {
    //   backgroundColor: scrollbarTrackBgColor,
    // },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.50",
      borderRadius: "5px",
    },
  };

  const checkAtLeastOneValue = (values: SegmentationQuestions) => {
    const errors: Partial<QuestionErrors> = {};

    if (!values.professions) {
      errors.professions = "Please select at least one value";
    }
    const hasGoals = Object.values(values.goals).some((v) => v === true);
    if (!hasGoals) {
      errors.goals = "Please select at least one value";
    }
    const hasSupport = Object.values(values.support).some((v) => v === true);
    if (!hasSupport) {
      errors.support = "Please select at least one value";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: DEFAULT_USER_SEGMENTATION.questions,
    enableReinitialize: true,
    validate: checkAtLeastOneValue,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: SegmentationQuestions) => {
      //console.log("submitting....");
      //console.log("values ----> ", values);
      userSegmentationMutation.mutate(values);
    },
  });

  const getSegmentationSection = (
    categoryKey: keyof SegmentationQuestions,
    questionKey: keyof Professions | keyof Goals | keyof Support
  ) => {
    if (!categoryKey || !questionKey) return undefined;
    switch (categoryKey) {
      // case "professions":
      //   return SEGMENTATION_TEXT.professions.values[questionKey as keyof Professions];
      case "goals":
        return SEGMENTATION_TEXT.goals.values[questionKey as keyof Goals];
      case "support":
        return SEGMENTATION_TEXT.support.values[questionKey as keyof Support];
    }
  };

  const getToggleCheckboxValue = (
    values: SegmentationQuestions,
    categoryKey: keyof SegmentationQuestions,
    questionKey: keyof Professions | keyof Goals | keyof Support
  ) => {
    if (!categoryKey || !questionKey) return undefined;
    switch (categoryKey) {
      // case "professions":
      //   return values.professions[questionKey as keyof Professions];
      case "goals":
        return values.goals[questionKey as keyof Goals];
      case "support":
        return values.support[questionKey as keyof Support];
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg={modalOverlayBgColor}
      />
      {/* <form onSubmit={formik.handleSubmit}> */}
      <form
        onSubmit={(e) => {
          //console.log("BEFORE SUBMIT");
          formik.handleSubmit(e);
        }}
      >
        <ModalContent
          maxW="672px"
          minW="600px"
          p="48px 0 48px 40px"
          borderRadius="24px"
          backgroundColor={modalContentBgColor}
          boxSize="border-box"
          h="80vh"
        >
          <>
            <Flex flexDir="column" h="100%">
              <ModalBody
                p={0}
                display="flex"
                flexDir="column"
                minH={0}
                flex="1"
              >
                <Flex alignItems="center" alignSelf="stretch">
                  <Text
                    color={titleTextColor}
                    fontWeight="500"
                    fontSize="25px"
                    lineHeight="32px"
                  >
                    Welcome to Knowlee!
                  </Text>
                </Flex>
                <Flex
                  className="scroll-hover"
                  flexDir="column"
                  overflowY="auto"
                  overflowX="hidden"
                  mr="16px"
                  my="32px"
                  sx={customScrollbar}
                >
                  {/* Professions radio buttons */}
                  <RadioGroup
                    id="professions"
                    name="professions"
                    onChange={(e) => {
                      formik.setFieldValue("professions", e);
                    }}
                    value={formik.values.professions}
                  >
                    <Flex w="100%" justifyContent="space-between">
                      <Flex
                        w="100%"
                        flexDir="column"
                        alignItems="center"
                        justify="space-between"
                        py={4}
                        borderTop="1px solid"
                        borderColor={borderColor}
                        gap="8px"
                      >
                        <Flex w="100%">
                          <Text
                            fontSize="18px"
                            fontWeight="500"
                            lineHeight="24px"
                            color={titleTextColor}
                            mb="8px"
                          >
                            {PROFESSIONS_SEGMENTATION_TEXT.title}
                          </Text>
                        </Flex>
                        {Object.entries(
                          PROFESSIONS_SEGMENTATION_TEXT.values
                        ).map(([optionValue, optionText]) => {
                          return (
                            <Flex
                              w="100%"
                              key={optionValue}
                              alignItems="center"
                              justify="space-between"
                            >
                              <Text
                                fontSize="16px"
                                fontWeight="400"
                                color={optionsTextColor}
                              >
                                {optionText}
                              </Text>
                              <FormControl w="auto">
                                <Radio value={optionValue} />
                              </FormControl>
                            </Flex>
                          );
                        })}
                        {!!formik.errors.professions && (
                          <Flex alignItems="center" mt={2}>
                            <WarningIcon mr={2} color="red.500" />
                            <Text color="red.500">
                              {formik.errors.professions}
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                      <Box h="100%" w="28px" />
                    </Flex>
                  </RadioGroup>
                  {(
                    Object.keys(SEGMENTATION_TEXT) as SegmentationQuestionKey[]
                  ).map((k) => (
                    <Flex w="100%" justifyContent="space-between" key={k}>
                      <Flex
                        w="100%"
                        flexDir="column"
                        alignItems="center"
                        justify="space-between"
                        py={4}
                        borderTop="1px solid"
                        borderColor={borderColor}
                        gap="8px"
                      >
                        <Flex w="100%">
                          <Text
                            fontSize="18px"
                            fontWeight="500"
                            lineHeight="24px"
                            color={titleTextColor}
                            mb="8px"
                          >
                            {SEGMENTATION_TEXT[k].title}
                          </Text>
                        </Flex>

                        {(
                          Object.keys(
                            SEGMENTATION_TEXT[k].values
                          ) as QuestionSegmentKeys[]
                        ).map((q) => (
                          <Flex
                            w="100%"
                            key={q}
                            alignItems="center"
                            justify="space-between"
                          >
                            <Text
                              fontSize="16px"
                              fontWeight="400"
                              color={optionsTextColor}
                            >
                              {getSegmentationSection(k, q)}
                            </Text>
                            <FormControl w="auto">
                              <Checkbox
                                isChecked={getToggleCheckboxValue(
                                  formik.values,
                                  k,
                                  q
                                )}
                                onChange={() => {
                                  formik.setFieldValue(
                                    `${k}.${q}`,
                                    !getToggleCheckboxValue(formik.values, k, q)
                                  );
                                }}
                              />
                            </FormControl>
                          </Flex>
                        ))}
                        {!!formik.errors[k] && (
                          <Flex alignItems="center" mt={2}>
                            <WarningIcon mr={2} color="red.500" />
                            <Text color="red.500">
                              {formik.errors[k] as string}
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                      <Box h="100%" w="28px" />
                    </Flex>
                  ))}
                </Flex>
                {(formik.errors.goals ||
                  formik.errors.professions ||
                  formik.errors.support) && (
                    <Flex alignItems="center">
                      <WarningIcon mr={2} color="red.500" />
                      <Text color="red.500">
                      {(formik.errors.goals ||
                        formik.errors.professions ||
                        formik.errors.support) as string}
                      </Text>
                    </Flex>
                  )}
                <SubmitButton
                  isDisabled={userSegmentationMutation.isLoading}
                  fontSize="16px"
                  w="auto"
                  mr="40px"
                >
                  Submit
                </SubmitButton>
              </ModalBody>
            </Flex>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default OnboardingSegmentation;
