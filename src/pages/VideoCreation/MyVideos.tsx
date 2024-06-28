import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    Tooltip,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { Link, createSearchParams } from "react-router-dom";
import PageContainer from "src/components/PageContainer";
import VideoCreationTabs from "src/components/VideoCreation/VideoCreationTabs";
import { useKlapVideos } from "src/api/queries/videoCreationQuery";
import { KlapVideo } from "src/types/klap.interface";
import { acceptedLanguageList } from "src/utils/klap";

function KlapVideoItem({
    klapVideo,
    index,
}: {
        klapVideo: KlapVideo;
        index: number;
}) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const backgroundColor = useColorModeValue("neutral.10", undefined);
    const navigate = useNavigate();

    function handleSearchIconClick() {
        const search = createSearchParams({ klapVideoId: klapVideo.id });
        navigate({
            pathname: "/video-creation/created-videos",
            search: `?${search.toString()}`,
        });
    }

    function getLanguageName(lang?: string) {
        const languageFound = acceptedLanguageList.find(({ value }) => {
            return value === lang;
        });
        return languageFound ? languageFound.label : lang;
    }

    return (
        <Flex
            borderRadius="10px"
            border="1px solid"
            borderColor={borderColor}
            px={5}
            py={2.5}
            alignItems="center"
            justifyContent="space-between"
            background={backgroundColor}
            gap="12px"
        >
            <Grid
                gap="12px"
                templateColumns="repeat(12, 1fr)"
                flexGrow={1}
                alignItems="center"
            >
                <GridItem colSpan={1}>
                    <Text>#{index}</Text>
                </GridItem>
                <GridItem colSpan={8}>
                    <Link to={klapVideo.sourceVideoUrl} target="_blank">
                        <Text textDecoration="underline">{klapVideo.sourceVideoUrl}</Text>
                    </Link>
                </GridItem>
                <GridItem colSpan={2}>
                    <Text casing="capitalize">{getLanguageName(klapVideo.language)}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{klapVideo.maxDuration}s</Text>
                </GridItem>
            </Grid>
            <Button
                bg="primary.50"
                _hover={{}}
                color="neutral.10"
                borderRadius={"12px"}
                p={2}
                onClick={handleSearchIconClick}
            >
                <SearchIcon
                    boxSize={"5"}
                    style={{
                        rotate: "90deg",
                    }}
                />
            </Button>
        </Flex>
    );
}

function MyVideos() {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const { isLoading, data: klapVideoList } = useKlapVideos();

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
            <Box mt={5} overflow="auto" className="scroll-hover" color={textColor}>
                {/* <Text color="neutral.60" fontWeight="500">
                    My Videos
                </Text> */}
                <Stack gap={2}>
                    {isLoading && (
                        <Flex alignItems="center" justifyContent="center">
                            <Spinner speed="0.8s" color="primary.50" />
                        </Flex>
                    )}

                    {klapVideoList && klapVideoList.length === 0 && (
                        <Flex alignItems="center" justifyContent="center" height="full">
                            <Box>No videos created yet</Box>
                        </Flex>
                    )}
                    {klapVideoList &&
                        klapVideoList.map((klapVideo, index) => {
                            return (
                                <KlapVideoItem
                                    klapVideo={klapVideo}
                                    key={klapVideo.id}
                                    index={index + 1}
                                />
                            );
                        })}
                </Stack>
            </Box>
        </PageContainer>
    );
}

export default MyVideos;
