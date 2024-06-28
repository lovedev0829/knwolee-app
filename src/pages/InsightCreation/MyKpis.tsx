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
import { useMyKpis } from "src/api/queries/insightCreationQuery";
import InsightCreationTabs from "src/components/InsightCreation/InsightCreationTabs";
import PageContainer from "src/components/PageContainer";
import { IKpi } from "src/types/insightCreation.interface";

function KpiItem({ kpi, index }: { kpi: IKpi; index: number }) {
    const borderColor = useColorModeValue("neutral.20", "#343839");
    const backgroundColor = useColorModeValue("neutral.10", undefined);
    const navigate = useNavigate();

    function handleSearchIconClick() {
        const search = createSearchParams({ kpiId: kpi._id });
        navigate({
            pathname: "/insight-creation/created-insight",
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
                <Text>{kpi.kpiTitle}</Text>
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

function MyKpis() {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const { isLoading, data: kpiList } = useMyKpis();

    return (
        <PageContainer 
        title={
            <Flex alignItems="center">
            <Text mr={2}>Insight Creator</Text>
            <Tooltip label="Additional information here" fontSize="sm">
                <span>
                <InfoIcon boxSize="16px" />
                </span>
            </Tooltip>
            </Flex>
        }
        >
            <InsightCreationTabs />
            <Box mt={5} overflow="auto" className="scroll-hover" color={textColor}>
                <Text color="neutral.60" fontWeight="500">
                    Kpi headlines
                </Text>
                <Stack gap={2} mt={4}>
                    {isLoading && (
                        <Flex alignItems="center" justifyContent="center">
                            <Spinner speed="0.8s" color="primary.50" />
                        </Flex>
                    )}

                    {kpiList && kpiList.length === 0 && (
                        <Flex alignItems="center" justifyContent="center" height="full">
                            <Box>No kpis created yet</Box>
                        </Flex>
                    )}
                    {kpiList &&
                        kpiList.map((kpi, index) => {
                            return (
                                <KpiItem kpi={kpi} key={kpi._id} index={index + 1} />
                            );
                        })}
              </Stack>
          </Box>
      </PageContainer>
  );
}

export default MyKpis;
