import {
    Flex,
    Spinner,
    Stack,
    Table,
    Tbody,
    // Thead,
    Tr,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
// import { useSearchParams } from "react-router-dom";
// import { useCreatedInsights } from "src/api/queries/insightCreationQuery";
// import CreatedInsightTabs from "src/components/InsightCreation/CreatedInsight/CreatedInsightTabs";
// import TopicItem from "src/components/InsightCreation/CreatedInsight/TopicItem";
import KpiItemRow from "src/components/InsightCreation/CreatedInsight/KpiItemRow";
import PageContainer from "src/components/PageContainer";
import InsightCreationTabs from "src/components/InsightCreation/InsightCreationTabs";
import { useArtemisInsightsData } from "src/api/queries/artemisInsightsQuery";
import { useUserData } from "src/api/queries";

function CreatedInsight() {
    // const [searchParams] = useSearchParams();
    // const formats = searchParams.getAll("formats");

    const { data: userData } = useUserData();
    const { isLoading, data } = useArtemisInsightsData({ formats: userData?.cryptoInsightInterests ?? [] });
    const insightList = data?.insights;

    return (
        <>
          <PageContainer 
            title={
                <Flex alignItems="center">
                <Text mr={2}>Insight Creator</Text>
                <Tooltip label="Exploit AI-generated insights to enhance the understanding of the financial markets. Fresh insights every day, just for you." fontSize="sm">
                    <span>
                    <InfoIcon boxSize="16px" />
                    </span>
                </Tooltip>
                </Flex>
            }
            >
                <InsightCreationTabs />
                <Stack gap={2} mt={4} overflow="auto" className="scroll-hover">
                    {/* {insightList &&
                        insightList.map((insight) => {
                            return <TopicItem insight={insight} key={insight._id} />;
                        })} */}
                    <Table variant="simple">
                        {/* <Thead position="sticky" top={0} zIndex="docked">
                            <CreatedInsightTabs />
                        </Thead> */}
                        <Tbody overflow="auto">
                            <Tr textAlign="center">
                                {isLoading && <Spinner speed="0.8s" color="primary.50" />}
                                {insightList && insightList.length === 0 && (
                                    <Text>No insight created yet</Text>
                                )}
                            </Tr>
                            {insightList &&
                                insightList.map((insight) => (
                                    <KpiItemRow key={insight._id} insight={insight} />
                                ))}
                        </Tbody>
                    </Table>
                </Stack>
            </PageContainer>
        </>
    );
}

export default CreatedInsight;
