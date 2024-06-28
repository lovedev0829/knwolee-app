import { ArrowUpIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    Input,
    Spinner,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import UploadIcon from "src/Icons/UploadIcon";
import { useGenerateTopicMutation } from "src/api/mutations/topicIndex";
import ContentCreationTabs from "src/components/ContentCreation/ContentCreationTabs";
import TopicItem from "src/components/ContentCreation/TopicGenerator/TopicItem";
import PageContainer from "src/components/PageContainer";
import { ContentFormat } from "src/types/contentCreation.interface";
import { useUserData } from "src/api/queries";
import { Navigate } from "react-router-dom";

const initialCheckedFormats = {
    tweet: false,
    thread: false,
    article: false,
    email: false,
    post: false,
};

function TopicGenerator() {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const borderColor = useColorModeValue("neutral.30", "neutral.80");
    const [topicText, setTopicText] = useState("");
    const [checkedFormats, setCheckedFormats] = useState(initialCheckedFormats);

    const isFormatSelected = Object.values(checkedFormats).some(Boolean);

    const {
        data: userData,
        isLoading: isLoadingUserData,
        isError: isErrorUserData,
    } = useUserData();

    if (!userData?.isSuperAdmin) {
        return <Navigate to="/dashboard" />;
    }

    const generateTopicMutation = useGenerateTopicMutation();
    const isButtonDisabled = !isFormatSelected || generateTopicMutation.isLoading;

    function resetStates() {
        setTopicText("");
        setCheckedFormats(initialCheckedFormats);
    }

    function getFormatsArray() {
        return Object.keys(checkedFormats).filter(
            (key) => checkedFormats[key as ContentFormat] === true
        ) as ContentFormat[];
    }

    async function handleGenerateIdeasClick() {
        const formats = getFormatsArray();
        await generateTopicMutation.mutateAsync({
            topic: "",
            formats: formats,
        });
        resetStates();
    }

    async function handleGenerateATopicClick() {
        const formats = getFormatsArray();
        await generateTopicMutation.mutateAsync({
            topic: topicText,
            formats: formats,
        });
        resetStates();
    }

    function handleFormatChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCheckedFormats((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    }

    return (
        <PageContainer
            title={
                <Flex alignItems="center">
                    <Text mr={2}>Content Creator</Text>
                    <Tooltip label="Generate custom topics or pull from your sources, select content formats, and access a library of tailored content created by Knowlee." fontSize="sm">
                        <span>
                            <InfoIcon boxSize="16px" />
                        </span>
                    </Tooltip>
                </Flex>
            }
        >            <ContentCreationTabs />
            <Stack gap={8} mt={5} overflow="auto" className="scroll-hover">
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Generate a Topic
                    </Text>
                    <Flex
                        gap={[2, 4, 8]}
                        alignItems={["unset", "unset", "center"]}
                        mt={4}
                        flexDirection={["column", "column", "row"]}
                        flexWrap="wrap"
                    >
                        <Flex
                            alignItems="center"
                            padding={3}
                            gap={3}
                            alignSelf="stretch"
                            borderRadius="12px"
                            border="2px solid"
                            borderColor={borderColor}
                            // background="neutral.10"
                            width={"100%"}
                            maxWidth={["100%", "100%", "450px"]}
                            maxHeight={40}
                        >
                            <Input
                                border="none"
                                padding={2}
                                focusBorderColor="transparent"
                                placeholder="Enter the topics and we'll generate ideas for you."
                                maxLength={4000}
                                value={topicText}
                                onChange={(e) => setTopicText(e.target.value)}
                            />
                            <Button
                                bg="primary.50"
                                _hover={{}}
                                color="neutral.10"
                                borderRadius={"12px"}
                                p={2}
                                onClick={handleGenerateATopicClick}
                                isDisabled={isButtonDisabled || !topicText.trim().length}
                            >
                                <ArrowUpIcon fontSize={"md"} boxSize={"6"} />
                            </Button>
                        </Flex>
                        <Text color="neutral.60" textAlign="center">OR</Text>
                        <Button
                            leftIcon={<UploadIcon />}
                            bg="primary.50"
                            color="neutral.10"
                            _hover={{}}
                            onClick={handleGenerateIdeasClick}
                            fontWeight="500"
                            isDisabled={isButtonDisabled}
                            isLoading={generateTopicMutation.isLoading}
                            flexWrap="wrap"
                            whiteSpace="pre-wrap"
                            height="auto"
                            py={2}
                        >
                            Generate ideas from my active sources
                        </Button>
                    </Flex>
                </Box>
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        What kind of content you want to generate?
                    </Text>
                    <CheckboxGroup>
                        <Flex
                            gap={4}
                            mt={4}
                            color={textColor}
                            fontSize="15px"
                            flexWrap="wrap"
                        >
                            <Checkbox
                                name="tweet"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.tweet}
                            >
                                Tweet
                            </Checkbox>
                            <Checkbox
                                name="thread"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.thread}
                            >
                                Thread
                            </Checkbox>
                            <Checkbox
                                name="post"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.post}
                            >
                                Post
                            </Checkbox>
                            <Checkbox
                                name="article"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.article}
                            >
                                Article
                            </Checkbox>
                            <Checkbox
                                name="email"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.email}
                            >
                                Email
                            </Checkbox>
                        </Flex>
                    </CheckboxGroup>
                </Box>
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Topic headlines
                    </Text>
                    {generateTopicMutation.isLoading && (
                        <Flex alignItems="center" justifyContent="center" width="full">
                            <Spinner color="primary.50" />
                        </Flex>
                    )}
                    <Stack gap={2} mt={4}>
                        {generateTopicMutation.data &&
                            generateTopicMutation.data.map((topic, index) => {
                                return <TopicItem topic={topic} key={index} />;
                            })}
                    </Stack>
                </Box>
            </Stack>
        </PageContainer>
    );
}

export default TopicGenerator;
