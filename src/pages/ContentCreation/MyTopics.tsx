import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    Tooltip
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useMyTopics } from "src/api/queries/contentCreationQuery";
import ContentCreationTabs from "src/components/ContentCreation/ContentCreationTabs";
import PageContainer from "src/components/PageContainer";
import { ITopic } from "src/types/contentCreation.interface";
import { useUserData } from "src/api/queries";
import { Navigate } from "react-router-dom";

function TopicItem({ topic, index }: { topic: ITopic; index: number }) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const backgroundColor = useColorModeValue("neutral.10", undefined);
    const navigate = useNavigate();
    
    const {
        data: userData,
        isLoading: isLoadingUserData,
        isError: isErrorUserData,
    } = useUserData();

    if (!userData?.isSuperAdmin) {
        return <Navigate to="/dashboard" />;
    }

    function handleSearchIconClick() {
        const search = createSearchParams({ topicId: topic._id });
        navigate({
            pathname: "/content-creation/created-content",
            search: `?${search.toString()}`,
        });
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
        >
            <Flex gap="12px">
                <Text>#{index}</Text>
                <Text>{topic.topicTitle}</Text>
            </Flex>
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

function MyTopics() {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const { isLoading, data: topicList } = useMyTopics();

    return (
        <PageContainer 
        title={
            <Flex alignItems="center">
            <Text mr={2}>Content Creator</Text>
            <Tooltip label="In this page you can find all topics created for you based on your keywords and active sources." fontSize="sm">
                <span>
                <InfoIcon boxSize="16px" />
                </span>
            </Tooltip>
            </Flex>
        }
        >
            <ContentCreationTabs />
            <Box mt={5} overflow="auto" className="scroll-hover" color={textColor}>
                <Text color="neutral.60" fontWeight="500">
                    Topic headlines
                </Text>
                <Stack gap={2} mt={4}>
                    {isLoading && (
                        <Flex alignItems="center" justifyContent="center">
                            <Spinner speed="0.8s" color="primary.50" />
                        </Flex>
                    )}

                    {topicList && topicList.length === 0 && (
                        <Flex alignItems="center" justifyContent="center" height="full">
                            <Box>No topics created yet</Box>
                        </Flex>
                    )}
                    {topicList &&
                        topicList.map((topic, index) => {
                            return (
                                <TopicItem topic={topic} key={topic._id} index={index + 1} />
                            );
                        })}
              </Stack>
          </Box>
      </PageContainer>
  );
}

export default MyTopics;
