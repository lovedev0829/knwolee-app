import { ArrowUpIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Radio,
    RadioGroup,
    Flex,
    Input,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    Select,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import UploadIcon from "src/Icons/UploadIcon";
import PageContainer from "src/components/PageContainer";
import VideoCreationTabs from "src/components/VideoCreation/VideoCreationTabs";
import {
    acceptedDurationList,
    acceptedLanguageList,
    isYouTubeVideoUrl,
} from "src/utils/klap";
import { useGenerateVideoMutation } from "src/api/mutations/videoToVideoIndex";
import { useFindEntities } from "src/api/queries/entityQuery";
import YouTubeVideoItem from "src/components/VideoCreation/VideoGenerator/YouTubeVideoItem";
import { createSearchParams, useNavigate } from "react-router-dom";

function VideoGenerator() {
    const navigate = useNavigate();
    const toast = useToast();
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const borderColor = useColorModeValue("neutral.30", "neutral.80");
    const [sourceVideoUrl, setSourceVideoUrl] = useState("");
    const [maxDuration, setMaxDuration] = useState<string>();
    const [language, setLanguage] = useState<string>();
    const [findEntityEnabled, setFindEntityEnabled] = useState(false);

    const { isLoading: isLoadingGenerateVideo, mutateAsync, variables } =
        useGenerateVideoMutation();
    const {
        data: youtubeEntities,
        // isLoading: isLoadingFindEntities,
        isFetching: isFetchingEntities,
    } = useFindEntities(
        { sourceType: "youtube", subSetType: "video" },
        { enabled: findEntityEnabled }
    );

    function resetStates() {
        setSourceVideoUrl("");
        setMaxDuration(undefined);
        setLanguage(undefined);
    }

    async function handleGenerateVideoClick(sourceVideoUrl: string) {
        if (!isYouTubeVideoUrl(sourceVideoUrl)) {
            return toast({
                title: "Validation Error",
                description: "Invalid YouTube video URL",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        const data = await mutateAsync({
            sourceVideoUrl: sourceVideoUrl,
            language: language,
            maxDuration: maxDuration ? Number(maxDuration) : undefined,
        });

        // navigate to created videos tab
        if (data?.klapExportedClip?.video_id) {
            const search = createSearchParams({
                klapVideoId: data.klapExportedClip.video_id,
            });
            navigate({
                pathname: "/video-creation/created-videos",
                search: `?${search.toString()}`,
            });
        }
        resetStates();
    }

    function renderYoutubeVideosEntity() {
        if (youtubeEntities?.length) {
            return (
                <Stack gap={2} mt={4}>
                    {youtubeEntities.map((entity) => {
                        return (
                            <YouTubeVideoItem
                                entity={entity}
                                key={entity.id}
                                handleSelectYouTubeVideo={() =>
                                    handleGenerateVideoClick(entity.value)
                                }
                                isLoading={isLoadingGenerateVideo && variables?.sourceVideoUrl === entity?.value}
                                isDisabled={isLoadingGenerateVideo}
                            />
                        );
                    })}
                </Stack>
            );
        }
        if (youtubeEntities && !youtubeEntities.length) {
            return <Text>No YouTube Videos</Text>;
        }
        if (isFetchingEntities) {
            return (
                <Flex alignItems="center" justifyContent="center" width="full">
                    <Spinner color="primary.50" />
                </Flex>
            );
        }
    }

    return (
        <PageContainer
            title={
                <Flex alignItems="center">
                    <Text mr={2}>Video Creator</Text>
                    <Tooltip label="Additional information here" fontSize="sm">
                        <span>
                            <InfoIcon boxSize="16px" />
                        </span>
                    </Tooltip>
                </Flex>
            }
        >
            <VideoCreationTabs />
            <Stack gap={8} mt={5} overflow="auto" className="scroll-hover">
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Input a YouTube Video
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
                                placeholder="Enter a valid public link for a YouTube Video"
                                maxLength={80}
                                value={sourceVideoUrl}
                                onChange={(e) => setSourceVideoUrl(e.target.value)}
                            />
                            <Button
                                bg="primary.50"
                                _hover={{}}
                                color="neutral.10"
                                borderRadius={"12px"}
                                p={2}
                                onClick={() => handleGenerateVideoClick(sourceVideoUrl)}
                                isDisabled={
                                    isLoadingGenerateVideo || !sourceVideoUrl.trim().length
                                }
                                isLoading={isLoadingGenerateVideo}
                            >
                                <ArrowUpIcon fontSize={"md"} boxSize={"6"} />
                            </Button>
                        </Flex>
                        <Text color="neutral.60" textAlign="center">
                            OR
                        </Text>
                        <Button
                            leftIcon={<UploadIcon />}
                            bg="primary.50"
                            color="neutral.10"
                            _hover={{}}
                            onClick={() => setFindEntityEnabled(true)}
                            fontWeight="500"
                            flexWrap="wrap"
                            whiteSpace="pre-wrap"
                            height="auto"
                            py={2}
                            // isLoading={isFetchingEntities}
                        >
                            Generate ideas from my active sources
                        </Button>
                    </Flex>
                </Box>
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Select Duration
                    </Text>
                    <RadioGroup onChange={setMaxDuration} value={maxDuration}>
                        <Flex
                            gap="16px"
                            marginTop="12px"
                            color={textColor}
                            fontSize="15px"
                            flexWrap="wrap"
                        >
                            {acceptedDurationList.map(({ label, value }) => {
                                return (
                                    <Radio value={value} key={value}>
                                        {label}
                                    </Radio>
                                );
                            })}
                        </Flex>
                    </RadioGroup>
                </Box>
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Select Language
                    </Text>
                    <Select
                        marginTop="12px"
                        onChange={(e) => setLanguage(e.target.value)}
                        value={language || "default"}
                        maxWidth="200px"
                    >
                        <option disabled value="default">
                            Select Language
                        </option>
                        {acceptedLanguageList.map(({ label, value }) => {
                            return (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            );
                        })}
                    </Select>
                </Box>
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        YouTube Videos
                    </Text>
                    {renderYoutubeVideosEntity()}
                </Box>
            </Stack>
        </PageContainer>
    );
}

export default VideoGenerator;
