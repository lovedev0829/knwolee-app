import {
    Flex,
    Spinner,
    Stack,
    Table,
    Tbody,
    Text,
    Tooltip,
    Box,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import PageContainer from "src/components/PageContainer";
import VideoCreationTabs from "src/components/VideoCreation/VideoCreationTabs";
import { useKlapExportedClips } from "src/api/queries/videoCreationQuery";
import ExportedClipItemRow from "src/components/VideoCreation/CreatedVideo/ExportedClipItemRow";

function CreatedVideos() {
    const [searchParams] = useSearchParams();
    const klapVideoId = searchParams.get("klapVideoId");
    const { isLoading, data: exportedClipList } = useKlapExportedClips({
        video_id: klapVideoId,
    });

    return (
        <>
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
                <Box textAlign="center" mt={5}>
                    {isLoading && <Spinner speed="0.8s" color="primary.50" />}
                    {exportedClipList && exportedClipList.length === 0 && (
                        <Text>No Video clip exported yet</Text>
                    )}
                </Box>
                <Stack gap={2} overflow="auto" className="scroll-hover">
                    <Table variant="simple">
                        {/* <Thead position="sticky" top={0} zIndex="docked">
                            <VideoCreationTabs />
                        </Thead> */}
                        <Tbody overflow="auto">
                            {exportedClipList &&
                                exportedClipList.map((exportedClip) => (
                                    <ExportedClipItemRow
                                        key={exportedClip.id}
                                        klapExportedClip={exportedClip}
                                    />
                                ))}
                        </Tbody>
                    </Table>
                </Stack>
            </PageContainer>
        </>
    );
}

export default CreatedVideos;
