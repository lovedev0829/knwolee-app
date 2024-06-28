import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Spinner,
	Text,
	useColorModeValue,
	useToast,
	useColorMode,
	Textarea,
	Tooltip,
	Stack,
	IconButton,
	FormHelperText,
	Switch
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAssistantMutation } from "src/api/mutations/knowleeAgentIndex";
import { useUserScrapedData } from "src/api/queries";
import { useAvailableFunctionsWithGrouping, useRetrieveAssistant } from "src/api/queries/knowleeAgentQuery";
import { CreateKnowleeAgentPayload } from "src/api/requests/knowleeAgentIndex";
import AgentDataSourceRow from "src/components/KnowleeAgents/CreateAgent/AgentDataSourceRow";
import OpenAIFunctionsInput from "src/components/KnowleeAgents/OpenAIFunctionsInput";
import { isDoubleStepEntity } from "src/utils/entity";
import { InfoOutlineIcon } from "@chakra-ui/icons"
import AgentAvtarModal from "../../components/common/AgentAvatar"
import * as AiIcons from 'react-icons/ai';
import { AiFillRobot } from "react-icons/ai";
import { Select } from "chakra-react-select";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import { SubscriptionFeature } from "src/types/subscription.interface";

function UpdateAssistant() {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate();
	const { assistantId } = useParams();
	const { data: assistantDetails, isLoading: isLoadingAssistanceDetails } =
		useRetrieveAssistant(assistantId!);

	const { data: availableFunctionListWithGrouping } = useAvailableFunctionsWithGrouping();

	// Derive isDefaultAssistant from the assistantDetails
	const isDefaultAssistant = assistantDetails?.isDefaultAgentAdded;

	const toast = useToast();
	const { colorMode } = useColorMode();
	const borderColor = useColorModeValue("neutral.30", "neutral.80");
	const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
	const labelTextColor = useColorModeValue("neutral.60", "neutral.40");
	const selectColorMode = useColorModeValue("white", "#232627");
	const selectHoverColorMode = useColorModeValue("#E2E8F0", "#474a4b");

	const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);
	const [aiAvatar, setAiAvatar] = useState(<AiFillRobot size={35} />)
	const [aiAvatarColor, setAiAvatarColor] = useState("")
	const { data: userSubsriptionRes } = useGetUserSubscription();
	const { data: userEntities, isLoading: isUserEntitiesLoading } = useUserScrapedData({ excludeNoData: true });
	const [numInputs, setNumInputs] = useState(4);
	const [onlyEnabledSources, setOnlyEnabledSources] = useState(false);
	const { mutateAsync: updateAssistant, isLoading: isLoadingUpdateAssistant } =
		useUpdateAssistantMutation();

	const openAvatarModal = () => {
		setIsOpenAvatarModal(!isOpenAvatarModal);
	}

	const handleChageAiAvatar = (avatar: JSX.Element, color: string) => {
		setAiAvatar(avatar);
		setAiAvatarColor(color);
		setIsOpenAvatarModal(false);
	}

	function handleOnlyEnabledChange(e: React.ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;
		setOnlyEnabledSources(checked);
	}


	const formik = useFormik<CreateKnowleeAgentPayload>({
		initialValues: {
			avatar: {
				name: (aiAvatar?.type as { name: string } | undefined)?.name,
				color: aiAvatarColor
			},
			entityIds: [],
			functionDefinitions: [],
			functionTypes: [],
			openai_model: "",
			instructions: "",
			name: "",
			initialPrompts: ['', '', '', '']
		},
		onSubmit: async (values, { resetForm }) => {
			if (!assistantDetails) {
				return console.error("Assistant not found", assistantId);
			}
			const { entityIds = [], functionTypes = [] } = values;
			const { assistant } = assistantDetails;
			if (!entityIds.length && !functionTypes.length) {
				toast({
					title: "Validation Error",
					description: "Select at least a data source or an advanced capability",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			const matchedIds = availableFunctionListWithGrouping?.filter((group) => values.functionTypes.includes(group.functionType))
				.map((group) => group.data.map((fn) => fn._id))
				.flat();

			values.functionDefinitions = matchedIds || [];
			const params = {
				id: assistant.id,
				...values,
				avatar: {
					name: (aiAvatar?.type as { name: string } | undefined)?.name,
					color: aiAvatarColor
				}
			};
			await updateAssistant(params);
			resetForm();
			navigate(-1);
		},
	});
	const { errors, handleChange, handleReset, handleSubmit, values, setValues, setFieldValue } =
		formik;


	useEffect(() => {
		if (assistantDetails) {
			// console.log(assistantDetails)
			const {
				avatar,
				assistant,
				entityIds = [],
				initialPrompts = ["", "", "", ""],
				functionDefinitions,
				functionTypes,
				openai_model = "",
			} = assistantDetails;
			const { instructions = "", name = "" } = assistant;

			if (avatar && AiIcons[avatar?.name as keyof typeof AiIcons]) {
				const IconComponent = AiIcons[avatar?.name as keyof typeof AiIcons] as React.ComponentType<{ color: string }>;
				setAiAvatar(<IconComponent color={avatar?.color} />);
				setAiAvatarColor(avatar?.color);
			}

			setValues({
				avatar: avatar,
				entityIds: entityIds || [],
				instructions: instructions || "",
				name: name || "",
				initialPrompts: initialPrompts || ["", "", "", ""],
				functionDefinitions: functionDefinitions || [],
				functionTypes: functionTypes || [],
				openai_model: openai_model || "",
			});
		}
	}, [assistantDetails, setValues]);

	useLayoutEffect(() => {
		if (textareaRef.current && textareaRef.current.scrollHeight) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [values.instructions]);

	if (isLoadingAssistanceDetails) {
		return (
			<Box textAlign="center">
				<Spinner speed="0.8s" color="primary.50" />
			</Box>
		);
	}

	if (!assistantDetails) {
		navigate(-1);
		return null;
	}

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		handleReset(e);
		navigate("/knowlee-assistants/my-assistants")
	}

	const availableOpenaiModels = (userSubsriptionRes?.userSubscription?.plan as SubscriptionFeature)?.available_openai_models || [];

	const openai_models = availableOpenaiModels.map(model => {
		let label = model.replace(/-/g, ' ').toUpperCase();
		label = label.charAt(0) + label.slice(1).toLowerCase();
		return {
			label: label,
			value: model
		};
	});

	const defaultOpenaiModels = [
		{
			label: "GPT 3.5 Turbo",
			value: "gpt-3.5-turbo",
		},
		{
			label: "GPT 4o",
			value: "gpt-4o",
		}
		// {
		// 	label: "GPT 4 Turbo",
		// 	value: "gpt-4-turbo",
		// }
	]

	const models = openai_models.length > 0 ? openai_models : defaultOpenaiModels;
	const selectedOption = models.find(option => option.value === values.openai_model);

	return (
		<Box
			as="form"
			overflow="auto"
			onSubmit={handleSubmit}
			p="4" // Add some padding around the content (optional, adjust as needed)
			m="0 auto" // Automatically adjust margins to center the content
			w="full" // Use "full" for full-width or specify a custom width
		>
			<Stack gap={3}>
				{!isDefaultAssistant && (
					<>
						<FormControl
							display="flex"
							flexDirection="column"
							gap="8px"
							isInvalid={Boolean(errors.name)}
						>
							<FormLabel
								color={labelTextColor}
								marginBottom="0"
							>
								Name
								<Tooltip
									label="Enter a unique name for your assistant. This name will be used to identify your assistant across the platform."
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
									placeholder="Edit the name of your AI Assistant"
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
						<FormControl
							display="flex"
							flexDirection="column"
							gap="3x"
							isInvalid={Boolean(errors.instructions)}
						>
							<FormLabel
								color={labelTextColor}
								fontWeight="500"
							>
								Instructions
								<Tooltip
									label="Provide detailed instructions for your assistant. Describe its tasks, objectives, and any specific preferences or constraints."
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
							<Textarea
								borderRadius="8px"
								width={"100%"}
								maxWidth={["100%", "100%", "976px"]}
								padding={3}
								placeholder="Edit the instructions"
								resize="both"
								overflow="auto"
								value={values.instructions}
								maxH="131px"
								onChange={(e) => {
									e.target.style.height = "auto";
									e.target.style.height = `${e.target.scrollHeight}px`;
									handleChange(e)
								}}
								name="instructions"
								required={true}
								maxLength={8000}
								ref={textareaRef}
							/>
							{
								!errors.instructions ?
									(
										<FormHelperText>{values.instructions.length}/8,000 characters</FormHelperText>
									) : (
										<FormErrorMessage>{errors.instructions}</FormErrorMessage>
									)
							}
						</FormControl>
						<Stack direction={["column", "column", "row"]} gap={["10px", "10px", "20px"]}>
							<FormControl
								display="flex"
								flexDirection="column"
								gap="8px"
								maxW="274px"
								isInvalid={Boolean(errors.openai_model)}
							>
								<FormLabel
									color={labelTextColor}
									fontWeight="500"
									marginBottom="0" // Remove any default bottom margin
								>
									Model
									<Tooltip
										label="Select the AI model to use for your assistant."
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
								<Select
									useBasicStyles={true}
									placeholder="Select an AI Model"
									chakraStyles={{
										control: (provided) => ({
											...provided,
											maxWidth: "274px",
											height: "56px"
										}),
										option: (provided) => ({
											...provided,
											backgroundColor: selectColorMode,
											_hover: {
												bg: selectHoverColorMode,
											},
										}),
										menuList: (provided) => ({
											...provided,
											backgroundColor: selectColorMode,
										}),
									}}
									menuPosition="fixed"
									options={models}
									defaultValue={selectedOption}
									value={{
										label: selectedOption?.label,
										value: selectedOption?.label,
									}}
									onChange={(selected) => {
										setFieldValue("openai_model", selected?.value);
									}}
								/>
								<FormErrorMessage>{errors.openai_model}</FormErrorMessage>
							</FormControl>
							<OpenAIFunctionsInput
								handleChange={handleChange}
								values={values}
								setValues={setValues} // Pass the Formik setValues function as a prop
							/>
						</Stack>
					</>
				)}

				<FormControl maxWidth={["100%", "100%", "976px"]}>

					<Stack direction="row">
						<FormLabel
							color={labelTextColor}
							fontWeight="500"
						>
							<Text color={labelTextColor} fontWeight="500">
								Data Sources
								<Tooltip
									label="Select the data sources your assistant will use to gather information. You can filter sources to include only those that are currently enabled."
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
							</Text>
						</FormLabel>
						<Flex alignItems="center">
							<FormLabel
								fontSize="13px"
								color={labelTextColor}
								fontWeight="100"
								marginBottom="0"
								marginLeft="10"
							>
								<Text color={labelTextColor} fontWeight="400">
									Show Only Selected Sources
									<Tooltip label="Filter to show only the data sources that are enabled. Use this to streamline the selection of active sources for your assistant." fontSize="sm">
										<span>
											<InfoOutlineIcon cursor="help" boxSize="14px" ml="6px" mb="2px" color="primary.50" />
										</span>
									</Tooltip>
								</Text>
							</FormLabel>
							<Switch
								id="only-enabled-sources"
								defaultChecked={onlyEnabledSources}
								checked={onlyEnabledSources}
								onChange={handleOnlyEnabledChange}
							/>
						</Flex>
					</Stack>

					<Box flexDirection="column" maxHeight="240px" overflowY="auto">
						{isUserEntitiesLoading ? (
							<Flex
								alignItems="center"
								height="100%"
								justifyContent="center"
							>
								<Spinner speed="0.8s" color="primary.50" />
							</Flex>
						) :
							<Stack gap={4}>
								{
									userEntities?.entityList?.map((entity) => {
										const { isScraped } = entity;
										// don't show double-step entity, not sracped entity and entity with no uservectors
										if (isDoubleStepEntity(entity) || !isScraped) {
											//temp: pause pinecone, || !userVectors.length
											return null;
										}
										if (onlyEnabledSources && !values?.entityIds?.includes(entity.id)) {
											return null;
										}
										return (
											<AgentDataSourceRow
												key={entity.id}
												entity={entity}
												handleChange={handleChange}
												values={values}
											/>
										);
									})
								}
							</Stack>
						}
					</Box>
				</FormControl>
				<FormControl
					display="flex"
					flexDirection="column"
					gap="8px"
				>

					<FormLabel
						color={colorMode === "dark" ? "neutral.40" : "neutral.60"}
						fontWeight="500"
						// mt="16px"
						marginBottom="0"
					>
						Conversation Starters
						<Tooltip
							label="List initial questions or prompts to configure how your assistant starts conversations. This helps tailor the assistant's interactions according to your needs."
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
					{values.initialPrompts.map((_, index) => (
						<div key={index}>
							{index < numInputs && (
								<Input
									borderRadius="8px"
									maxWidth={["100%", "100%", "976px"]}
									height="56px"
									border="1px solid"
									borderColor={borderColor}
									padding={3}
									placeholder={`Question ${index + 1}`}
									value={values.initialPrompts[index]}
									onChange={handleChange}
									width="full"
									name={`initialPrompts[${index}]`}
									marginTop="0"
								/>
							)}
						</div>
					))}
					<FormErrorMessage>{errors.name}</FormErrorMessage>
				</FormControl>
			</Stack>
			<AgentAvtarModal isOpen={isOpenAvatarModal} openAvatarModal={openAvatarModal} handleChageAiAvatar={handleChageAiAvatar} />
			<Flex bottom="10" justifyContent="center" gap="24px" marginTop="24px" maxWidth={["100%", "100%", "976px"]}>
				<Stack position="absolute" bottom={7} direction="row">
					<Button
						fontWeight="500"
						color="neutral.10"
						bg="primary.50"
						minWidth={["auto", "144px"]}
						type="submit"
						isLoading={isLoadingUpdateAssistant}
						isDisabled={isLoadingUpdateAssistant}
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
		</Box>
	);
}

export default UpdateAssistant;