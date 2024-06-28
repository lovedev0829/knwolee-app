import {
    Flex,
    Spinner,
    Stack,
    Table,
    Tbody,
    Thead,
    Tr,
    Text,
    Tooltip,
    Button,
    Td,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import { useCreatedContents } from "src/api/queries/contentCreationQuery";
import CreatedContentTabs from "src/components/ContentCreation/CreatedContent/CreatedContentTabs";
// import TopicItem from "src/components/ContentCreation/CreatedContent/TopicItem";
import TopicItemRow from "src/components/ContentCreation/CreatedContent/TopicItemRow";
import PageContainer from "src/components/PageContainer";
import TwitterIcon from "src/components/Dashboard/Icons/TwitterIcon";
import { useTwitterConfig } from "src/api/queries/twitterQuery";
import { useTwitterLoginMutation } from "src/api/mutations/twitterIndex";
import { useUserData } from "src/api/queries";
import { Navigate } from "react-router-dom";
import MediumAuthButton from "src/components/ContentCreation/CreatedContent/MediumAuthButton";

function CreatedContent() {
    const [searchParams] = useSearchParams();
    const topicId = searchParams.get("topicId");
    const { isLoading, data: contentList } = useCreatedContents(topicId!);
    const {
        // data: twitterConfig,
        isLoading: twitterConfigLoading
    } = useTwitterConfig();
    const { mutateAsync: authorizeTwitter, isLoading: twitterAuthorizationLoading } =
        useTwitterLoginMutation();

    async function handleAuthorizeTwitter() {
        const data = await authorizeTwitter();
        if (data.authURL) {
            // window.open(data.authURL);
            window.location.href = data.authURL;
        }
    }

    const {
        data: userData,
        // isLoading: isLoadingUserData,
        // isError: isErrorUserData,
    } = useUserData();

    if (!userData?.isSuperAdmin) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            <PageContainer
                title={
                    <Flex alignItems="center">
                        <Text mr={2}>Content Creator</Text>
                        <Tooltip label="Enjoy the created contents. Click on Open to copy or improve them with Knowlee." fontSize="sm">
                            <span>
                                <InfoIcon boxSize="16px" />
                            </span>
                        </Tooltip>
                    </Flex>
                }
            >
                {/* <CreatedContentTabs /> */}
                <Stack gap={2} overflow="auto" className="scroll-hover">
                    {/* {contentList &&
                        contentList.map((content) => {
                            return <TopicItem content={content} key={content._id} />;
                        })} */}
                    <Table variant="simple">
                        <Thead position="sticky" top={0} zIndex="docked">
                            <CreatedContentTabs />
                        </Thead>
                        <Tr>
                            <Td colSpan={2}>
                                <Flex gap={2}>
                                <Button
                                    gap={2}
                                    isLoading={
                                        twitterConfigLoading || twitterAuthorizationLoading
                                    }
                                    onClick={handleAuthorizeTwitter}
                                // isDisabled={Boolean(twitterConfig)}
                                >
                                    <Flex
                                        alignItems="center"
                                        borderRadius="full"
                                        flexShrink={0}
                                        height={8}
                                        justifyContent="center"
                                        minW={8}
                                        width={8}
                                        bgColor="icons.twitter"
                                    >
                                        <TwitterIcon width="18" height="18" />
                                    </Flex>
                                    <Text>Connect</Text>
                                </Button>
                                {/* <MediumAuthButton /> */}
                                </Flex>
                                </Td>
                        </Tr>
                        <Tbody overflow="auto">
                            <Tr textAlign="center">
                                {isLoading && (<Spinner speed="0.8s" color="primary.50" />)}
                                {contentList && contentList.length === 0 && (
                                    <Text>No content created yet</Text>
                                )}
                            </Tr>
                            {contentList &&
                                contentList.map((content) => (
                                    <TopicItemRow key={content._id} content={content} />
                                ))}
                        </Tbody>
                    </Table>
                </Stack>
            </PageContainer>
        </>
    );
}

export default CreatedContent;
