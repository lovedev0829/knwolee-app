import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Spinner,
    useColorModeValue,
    Textarea,
    Tooltip,
    useToast,
    Text,
    Switch,
    IconButton,
    Select,
    FormHelperText,
    Stack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useUpdateKnowleeProcessMutation } from "src/api/mutations/knowleeProcessIndex";
import { useRetrieveUserProcess } from "src/api/queries/knowleeProcessQuery";
import { UpdateKnowleeProcessPayload } from "src/api/requests/knowleeProcessIndex";
import { useUserAgents } from "src/api/queries/knowleeAgentQuery";
import AgentAvtarModal from "../../components/common/AgentAvatar"
import * as AiIcons from 'react-icons/ai';
import { GiProcessor } from "react-icons/gi";
import { format } from "date-fns";
import { DATETIME_LOCAL_FORMAT } from "src/utils/time";


function UpdateProcess() {
    const toast = useToast();
    const navigate = useNavigate();
    const { processId } = useParams();
    const { data: userProcessDetails, isLoading: isLoadingAssistanceDetails } =
        useRetrieveUserProcess(processId!);

    const borderColor = useColorModeValue("neutral.30", "neutral.80");
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const labelTextColor = useColorModeValue("neutral.60", "neutral.40");
	const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);
	const [aiAvatar, setAiAvatar] = useState(<GiProcessor size={35} />)
	const [aiAvatarColor, setAiAvatarColor] = useState("")

    const { data: userAssistantList } = useUserAgents();
    const {
        mutateAsync: updateKnowleeProcess,
        isLoading: isLoadingUpdateKnowleeProcess,
    } = useUpdateKnowleeProcessMutation();

    const openAvatarModal = () => {
		setIsOpenAvatarModal(!isOpenAvatarModal);
	}

	const handleChageAiAvatar = (avatar: JSX.Element, color: string) => {
		setAiAvatar(avatar);
		setAiAvatarColor(color);
		setIsOpenAvatarModal(false);
	}
	
    const formik = useFormik<UpdateKnowleeProcessPayload>({
        initialValues: { id: processId as string },
        onSubmit: async (values, { resetForm }) => {
            const {
                goals = [],
                interval,
                isRecurring,
                name,
                scheduledAt,
                
            } = values;
            if (!name) {
                toast({
                    title: "Validation Error",
                    description: "Name is required",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            if (!goals?.length || goals.length < 2) {
                toast({
                    title: "Validation Error",
                    description: "At least 2 goals are required",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            const isGoalsValid = goals.every(
                ({ goal, assistantId }) => goal && assistantId
            );

            if (!isGoalsValid) {
                toast({
                    title: "Validation Error",
                    description: "Please enter goal and select assistant",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return true;
            }

            if (isRecurring && (!interval || Number(interval) <= 0)) {
                toast({
                    title: "Validation Error",
                    description:
                        "Please enter a valid interval in hours for the recurring process.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return; // Stop the submission if the interval is invalid
            }

            const params = {
				...values,
				avatar: {
					name: (aiAvatar?.type as { name: string } | undefined)?.name,
					color: aiAvatarColor
				},
                scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
			};
            await updateKnowleeProcess(params);
            resetForm();
            navigate("/knowlee-processes/my-processes");
        },
    });
    const { errors, handleChange, handleReset, handleSubmit, values, setValues } =
        formik;

    useEffect(() => {
        if (userProcessDetails) {
            const { goals, name, interval, isRecurring, scheduledAt, avatar } =
                userProcessDetails;

            if (avatar && AiIcons[avatar?.name as keyof typeof AiIcons]) {
                const IconComponent = AiIcons[avatar?.name as keyof typeof AiIcons] as React.ComponentType<{ color: string }>;
                setAiAvatar(<IconComponent color={avatar?.color} />);
                setAiAvatarColor(avatar?.color);
            }

            setValues({
                avatar: avatar,
                id: processId as string,
                goals,
                name,
                interval,
                isRecurring,
                scheduledAt: scheduledAt
                    ? format(new Date(scheduledAt), DATETIME_LOCAL_FORMAT)
                    : undefined,
            });
        }
    }, [processId, setValues, userProcessDetails]);

    if (isLoadingAssistanceDetails) {
        return (
            <Box textAlign="center">
                <Spinner speed="0.8s" color="primary.50" />
            </Box>
        );
    }

    if (!userProcessDetails) {
        navigate(-1);
        return null;
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleReset(e);
        navigate("/knowlee-processes/my-processes");
    };
    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            overflow={"auto"}
            w="full" // Use "full" for full-width or specify a custom width
            m="0 auto" // Automatically adjust margins to center the content
            p="4" // Add some padding around the content (optional, adjust as needed)
        >
            <Stack gap={3} direction="column">
                <FormControl
                    display="flex"
                    flexDirection="column"
                    gap="8px"
                    isInvalid={Boolean(errors.name)}
                >
                    <FormLabel color={labelTextColor} marginBottom="0">
                        Name
                        <Tooltip
                            label="Enter a unique name for your Process. This name will be used to identify your process across the platform."
                            fontSize="sm"
                        >
                            <span>
                                <InfoOutlineIcon
                                    cursor="help"
                                    boxSize="14px"
                                    ml="6px"
                                    color="primary.50"
                                />
                            </span>
                        </Tooltip>
                    </FormLabel>
                    <Stack direction="row">
                        <Input
                                borderRadius="8px"
                                height="56px"
                                maxWidth={["100%", "100%", "927px"]}
                                border="1px solid"
                                borderColor={borderColor}
                                padding={3}
                                placeholder="Type here"
                                value={values.name}
                                onChange={handleChange}
                                width="full"
                                name="name"
                                required={true}
                                marginTop="0" // Remove any default bottom margin
                        />
                        <IconButton
                            border={0}
                            onClick={openAvatarModal}
                            size='lg'
                            variant='outline'
                            aria-label="Ai Avatar"
                            fontSize='50px'
                            icon={aiAvatar}

                        />
                    </Stack>
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel
                            color={labelTextColor}
                            fontWeight="500"
                            marginBottom="0"
                        >
                            Goals
                            <Tooltip
                                label="Provide detailed goal for your process. Describe its tasks, objectives, and any specific preferences or constraints."
                                fontSize="sm"
                            >
                                <span>
                                    <InfoOutlineIcon
                                        cursor="help"
                                        boxSize="14px"
                                        ml="6px"
                                        color="primary.50"
                                    />
                                </span>
                            </Tooltip>
                        </FormLabel>
                        <Stack
                            pb={3}
                            gap={2}
                            display={"flex"}
                            flexDirection={"column"}
                            maxWidth={["100%", "100%", "927px"]}
                        >
                            {formik.values?.goals?.map(({ goal, assistantId }, index) => (
                                <>
                                    <Flex key={index} gap={2} alignItems={"center"}>
                                        <Flex alignItems={"center"}>
                                            <FormLabel
                                                color={labelTextColor}
                                                fontWeight="500"
                                                marginBottom="0"
                                                htmlFor={`goals.${index}.assistantId`}
                                            >
                                                Assistant:
                                            </FormLabel>
                                            <Select
                                                onChange={formik.handleChange}
                                                name={`goals.${index}.assistantId`}
                                                size="md"
                                                value={assistantId}
                                            >
                                                <option
                                                    key={"select-assistant"}
                                                    value={""}
                                                    disabled={true}
                                                >
                                                    Select Assistant
                                                </option>
                                                {userAssistantList?.map(({ assistant }) => {
                                                    const { id: assistantId = "", name = "" } = assistant;
                                                    return (
                                                        <option key={assistantId} value={assistantId}>
                                                            {name}
                                                        </option>
                                                    );
                                                })}
                                            </Select>
                                        </Flex>
                                        <Flex alignItems={"center"} flexGrow={1}>
                                            <FormLabel
                                                color={labelTextColor}
                                                fontWeight="500"
                                                marginBottom="0"
                                                htmlFor={`goals.${index}.goal`}
                                            >
                                                Task:
                                            </FormLabel>
                                            <Textarea
                                                border="1px solid"
                                                borderColor={borderColor}
                                                borderRadius="8px"
                                                name={`goals.${index}.goal`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={goal}
                                            />
                                        </Flex>
                                        <IconButton
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "goals",
                                                    values.goals?.filter((_, idx) => idx !== index)
                                                );
                                            }}
                                        />
                                    </Flex>
                                    <FormHelperText textAlign="right">{goal.length}/8,000 characters</FormHelperText>
                                </>
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue("goals", [
                                        ...(formik.values?.goals||[]),
                                        { goal: "", assistantId: "" },
                                    ])
                                }
                                width={"xs"}
                                // isDisabled={values.goals && values.goals?.length >= 2}
                            >
                                Add Task
                            </Button>
                        </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel
                            color={labelTextColor}
                            fontWeight="500"
                            marginBottom="0"
                        >
                            Schedule (optional)
                            <Tooltip
                                label="Enhance your chat experience by adding interactive tools that allow for direct in-chat creations and analyses. They may consume more credits."
                                fontSize="sm"
                            >
                                <span>
                                    <InfoOutlineIcon
                                        cursor="help"
                                        boxSize="14px"
                                        ml="2"
                                        color="primary.50"
                                    />
                                </span>
                            </Tooltip>
                        </FormLabel>
                        <Flex gap={3} flexDirection={"column"}>
                            <Flex gap={2} alignItems={"center"}>
                                <Text>Recurring</Text>
                                <Switch
                                    name="isRecurring"
                                    defaultChecked={values.isRecurring}
                                    isChecked={values.isRecurring}
                                    onChange={handleChange}
                                />
                            </Flex>
                            <FormControl>
                                <FormLabel>Schedule At</FormLabel>
                                <Input
                                    name="scheduledAt"
                                    type="datetime-local"
                                    value={values.scheduledAt as string}
                                    onChange={handleChange}
                                    width={"sm"}
                                    min={format(new Date(), DATETIME_LOCAL_FORMAT)}
                                />
                            </FormControl>
                            {values.isRecurring && (
                                <FormControl>
                                    <FormLabel>Every hours</FormLabel>
                                    <Input
                                        name="interval"
                                        type="number"
                                        min={0}
                                        step={0.5}
                                        value={values.interval}
                                        onChange={handleChange}
                                        width={"sm"}
                                        placeholder="0.5"
                                    />
                                </FormControl>)}
                        </Flex>
                        <Flex
                            flexDirection="column"
                            gap="8px"
                            marginTop="24px"
                            paddingRight="2"
                        >
                            <Flex justifyContent={"space-between"}></Flex>
                        </Flex>
                </FormControl>
            </Stack>
            <Flex  justifyContent="center" maxWidth={["100%", "100%", "976px"]} gap="24px" >
                <Stack position="absolute" bottom={20} direction="row">
                    <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        minWidth={["auto", "144px"]}
                        type="submit"
                        isLoading={isLoadingUpdateKnowleeProcess}
                        isDisabled={isLoadingUpdateKnowleeProcess}
                        _hover={{}}
                    >
                        Save
                    </Button>
                    <Button
                        fontWeight="500"
                        minWidth={["auto", "144px"]}
                        onClick={handleCancel}
                        color={headingTextColor}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Flex>
            <AgentAvtarModal isOpen={isOpenAvatarModal} openAvatarModal={openAvatarModal} handleChageAiAvatar={handleChageAiAvatar} />
        </Box>
    );
}

export default UpdateProcess;
