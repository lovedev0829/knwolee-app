import {
    Modal,
    ModalOverlay,
    ModalContent,
    useColorModeValue,
    Flex,
    Text,
    Button,
    ModalFooter,
    ModalHeader,
    Grid,
    ModalBody,
    GridItem,
    Box,
    // useToast,
    Spinner,
} from "@chakra-ui/react";
import { Entity } from "src/utils/types";
import { useEntityScrapedData } from "src/api/queries/entityQuery";
import { useEffect, useState } from "react";
import {
    IDocRecordData,
    IGoogleHeadlineData,
    IMediumData,
    IPDFData,
    IThreadData,
    ITweetData,
    IURLData,
    IYouTubeData,
    ICODAData,
    IRedditPost,
    IGitbookData,
    OpenAIData,
    IGithubDocument,
    IBubblemapsData,
    ICarbonScrapedData,
    IGoogleDriveScrapedData,
    IOneDriveScrapedData,
    ILinkedInJobDocument,
} from "src/types/scrapedData.interface";
import { SourceIcon } from "../Sources/SourcesTable/IconCell";
import MarkdownComponent from "../common/Markdown/MarkdownComponent";
import { useInView } from "react-intersection-observer"
// import ImproveCreatedContentSection from "../ContentCreation/CreatedContent/ImproveCreatedContentSection";
interface CreatedContentModalProps {
    entity: Entity;
    isOpen: boolean;
    onClose: () => void;
}

const initialPagination = { limit: 1, skip: 0, total: 0 };
function ContentModal({ entity, isOpen, onClose }: CreatedContentModalProps) {
    const { ref: observerTarget, inView } = useInView();
    const { sourceType, subSetType, value } = entity;
    const [contentTitle, setContentTitle] = useState("");
    const [contentData, setContentData] = useState("");
    const [pagination, setPagination] = useState(initialPagination);
    // const toast = useToast();

    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { isLoading, data } = useEntityScrapedData(entity.id, { limit: pagination.limit, skip: pagination.skip });

    // async function copyToClipboard(text: string) {
    //     await navigator.clipboard.writeText(text);

    //     // Show success toast
    //     toast({
    //         title: "Copied successfully!",
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //     });
    // }

    useEffect(() => {
        if (inView) {
            setPagination(prev => ({ ...prev, skip: prev.skip + prev.limit }))
        }
    }, [inView])

    function renderContentModalBody() {
        if ((isLoading && sourceType === "github" && !contentData) || (isLoading && sourceType !== "github")) {
            return (
                <Flex alignItems="center" justifyContent="center" height="100%">
                    <Spinner speed="0.8s" color="primary.50" />
                </Flex>
            );
        }
        if (!contentData) {
            return (
                <Flex alignItems="center" justifyContent="center" height="100%">
                    <Text textAlign="center">
                        There's nothing here
                    </Text>
                </Flex>
            );
        }
        return (
            <Grid
                gridTemplateColumns="repeat(18, 1fr)"
                height="full"
                display={["flex", "flex", "grid"]}
                flexDirection={["column", "column", "row"]}
                gap={["24px", "24px", "24px"]}
            >
                <GridItem
                    colSpan={12}
                    flexDirection="column"
                    color="neutral.50"
                    overflow="auto"
                    className="scroll-hover"
                    maxHeight={["50vh", "50vh", "80vh"]}
                    px={2}
                >
                    <ModalHeader
                        padding={0}
                        color={modalHeaderColor}
                        fontSize="22px"
                        fontWeight="700"
                        lineHeight="34px"
                    >
                        {contentTitle}
                    </ModalHeader>

                    {/* using react-markdown */}
                    <Box mt={5}>
                        {sourceType === "github" ?
                            <pre>{contentData}</pre> :
                            <MarkdownComponent>
                                {contentData}
                            </MarkdownComponent>}
                        {(pagination.total) > (pagination.skip + pagination.limit) &&
                            <Flex as="div" my="200px" minH="300px" height="calc(100% + 200px)" justifyContent="center" alignItems="center">
                                <Spinner as="div" ref={observerTarget} />
                            </Flex>
                        }
                    </Box>
                </GridItem>
                <GridItem
                    colSpan={6}
                    overflow="auto"
                    className="scroll-hover"
                    maxHeight={["40vh", "40vh", "80vh"]}
                >
                    <Flex
                        alignItems="center"
                        color={modalHeaderColor}
                        fontWeight="500"
                        gap={4}
                    >
                        <SourceIcon sourceType={sourceType} />
                    </Flex>
                    {/* <ImproveCreatedContentSection /> */}
                </GridItem>
            </Grid>
        );
    }

    useEffect(() => {
        if (data) {
            //console.log("data----->", data);
            switch (sourceType as string) {
                case "carbon": {
                    const { text = "" } = data as ICarbonScrapedData;
                    setContentData(text);
                    setContentTitle(value);
                    break;
                }

                case "google_drive": {
                    const { text = "", title = "" } = data as IGoogleDriveScrapedData;
                    setContentData(text);
                    setContentTitle(title);
                    break;
                }

                case "medium":
                    if (subSetType === "article") {
                        const { content, title } = data as IMediumData;
                        setContentData(content);
                        setContentTitle(title);
                    }
                    break;

                case "news":
                    if (subSetType === "url") {
                        const { content, title } = data as IGoogleHeadlineData;
                        setContentData(content);
                        setContentTitle(title);
                    }
                    break;

                case "microsoft_onedrive": {
                    const { text = "", itemId = "" } = data as IOneDriveScrapedData;
                    setContentData(text);
                    setContentTitle(itemId);
                    break;
                }

                case "pdf":
                    if (subSetType === "url") {
                        const { content } = data as IPDFData;
                        setContentData(content.join("\n"));
                        setContentTitle(value);
                    }
                    break;

                case "twitter":
                    if (subSetType === "tweet") {
                        const { full_text } = data as ITweetData;
                        setContentData(full_text);
                        setContentTitle(value);
                    }
                    if (subSetType === "thread") {
                        const { text } = data as IThreadData;
                        setContentData(text);
                        setContentTitle(value);
                    }
                    break;

                case "url":
                    if (subSetType === "url") {
                        const { content, title } = data as IURLData;
                        setContentData(content);
                        setContentTitle(title);
                    }
                    break;

                case "coda":
                    if (subSetType === "url") {
                        const { text, title } = data as ICODAData;
                        setContentData(text);
                        setContentTitle(title);
                    }
                    break;

                case "youtube":
                    if (subSetType === "video") {
                        const { transcript, title } = data as IYouTubeData;
                        setContentData(transcript);
                        setContentTitle(title);
                    }
                    break;

                case "reddit":
                    if (subSetType === "url") {
                        const { title, body } = data as IRedditPost;
                        setContentData(body);
                        setContentTitle(title);
                    }
                    break;
                case "openai":
                    if (subSetType === "url") {
                        const { metadata: { title }, text } = data as OpenAIData;
                        setContentData(text);
                        setContentTitle(title);
                    }
                    break;

                case "gitbook":
                    if (subSetType === "url") {
                        const { content } = data as IGitbookData;
                        setContentData(content?.map(c => c?.pageContent)?.join("\n"));
                        setContentTitle(content?.[0]?.metadata?.title);
                    }
                    break;
                case "github":
                    if (subSetType === "url") {
                        const { content, url } = data as IGithubDocument;
                        setContentTitle(url);
                        setPagination((prev) => ({ ...prev, total: content?.[0]?.total || 0 }))
                        const stringContent = content?.map(c => `\n${c?.file.metadata.source || ""}\n${c?.file.pageContent || ""}`)?.join("\n")
                        setContentData(prev => `\n${prev}\n${stringContent}`);
                    }
                    break;
                case "bubblemaps":
                    if (data) {
                        const { nodes, token_address: TokenAddress } = data as IBubblemapsData;
                        setContentTitle(TokenAddress);
                        setContentData(nodes.map(node => `\nName: ${node.name},\tAmount: ${node.amount},\tAddress: ${node.address},\tPercentage${node.percentage}`).join("\n\n"));
                    }
                    break;

                case "linkedin": {
                    if (subSetType === "url") {
                        const { jobs, url } = data as ILinkedInJobDocument;
                        setContentTitle(url);
                        // setContentData(JSON.stringify(jobs));
                        const cleanHtml = (html: string) => {
                            return html.replace(/<p><br><\/p>/g, ''); // Removes specific pattern <p><br></p>
                        };

                        const contentData = jobs
                            ?.map(
                                ({
                                    title = "",
                                    location = "",
                                    companyName = "",
                                    descriptionHtml = "",
                                    applyUrl = "",
                                }) => {
                                    return `<h1>${title}</h1>
                                    <p><strong>Location:</strong> ${location}</p>
                                    <p><strong>Company:</strong> ${companyName}</p>
                                    <div>${cleanHtml(descriptionHtml)}</div>
                                    <a href="${applyUrl}" target="_blank">Apply Here</a>`;
                                }
                            )
                            .join("\n");
                        setContentData(contentData);
                        // console.log("contentData----->", contentData);
                    }
                    break;
                }

                // local entity
                case "application/pdf":
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                case "text/plain":
                case "text/csv":
                case "application/json": {
                    const { content } = data as IDocRecordData;
                    setContentData(content?.map((v) => v.pageContent)?.join("\n"));
                    //console.log("----->", content?.map((v) => v.pageContent)?.join("\n"));
                    setContentTitle(value);
                    break;
                }
                case "audio/mp3":
                case "audio/mpeg":
                case "audio/x-m4a":
                case "audio/wav":
                case "audio/mpga": {
                    const { content } = data as IDocRecordData;
                    setContentData(content?.map((v) => v.text)?.join("\n"));
                    //console.log("----->", content?.map((v) => v.pageContent)?.join("\n"));
                    setContentTitle(value);
                    break;
                }

                default:
                //console.log("data----->", data);
            }
        }
    }, [data, sourceType, subSetType, value]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalOverlay bg={modalOverlayBgColor} />
            <ModalContent
                bg={modalContnetBgColor}
                padding="40px 20px 30px 32px"
                borderRadius={24}
                height="full"
            >
                <ModalBody padding={0}>{renderContentModalBody()}</ModalBody>
                <ModalFooter justifyContent="center" gap={6}>
                    {/* <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        _hover={{}}
                        minWidth="144px"
                        onClick={() => copyToClipboard(contentData)}
                        isDisabled={!contentData || isLoading}
                    >
                        Copy
                    </Button> */}
                    <Button onClick={onClose} fontWeight="500" minWidth="144px">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ContentModal;
