import { Th, Tr, useColorModeValue } from "@chakra-ui/react";
import InsightCreationTabs from "../InsightCreationTabs";
// import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

function CreatedInsightTabs() {
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const backgroundColor = useColorModeValue("neutral.10", "#232627");

    return (
        <>
            <Tr
                // border="1px solid transparent"
                borderBottom="1px solid transparent"
                outline="1px solid"
                outlineColor={backgroundColor}
                color={textColor}
                backgroundColor={backgroundColor}
            >
                <Th
                    padding={0}
                    colSpan={2}
                    textTransform="capitalize"
                >
                    <InsightCreationTabs />
                </Th>
                <Th
                    px={["16px", "16px", "24px"]}
                    textTransform="capitalize"
                    fontSize="16px"
                    fontWeight="400"
                >
                    {/* <Flex alignItems="center" gap={2}>
                        <Text whiteSpace="nowrap">Order by</Text>
                        <Flex flexDirection="column">
                            <TriangleUpIcon color="neutral.50" boxSize={3} cursor="pointer" />
                            <TriangleDownIcon color="neutral.50" boxSize={3} cursor="pointer" />
                        </Flex>
                    </Flex> */}
                </Th>
                <Th
                    px={["16px", "16px", "24px"]}
                    textTransform="capitalize"
                    fontSize="16px"
                    fontWeight="400"
                >
                    {/* <Flex alignItems="center" gap={2}>
                        <Text>Sources</Text>
                        <Flex flexDirection="column">
                            <TriangleUpIcon color="neutral.50" boxSize={3} cursor="pointer" />

                            <TriangleDownIcon color="neutral.50" boxSize={3} cursor="pointer" />
                        </Flex>
                    </Flex> */}
                </Th>
            </Tr>
            <Tr height="16px" />
            {/* <Grid
            alignItems="center"
            color="neutral.60"
            // templateColumns="repeat(18, 1fr)"
            templateRows="auto"
            overflow="auto"
            minHeight="70px"
        >
            <GridItem colSpan={14}>
                <InsightCreationTabs />
            </GridItem>
                <GridItem colSpan={2} colStart={15}>
                <Flex alignItems="center" gap={2}>
                    <Text whiteSpace="nowrap">Order by</Text>
                    <Flex flexDirection="column">
                        <TriangleUpIcon color="neutral.50" boxSize={3} cursor="pointer" />

                        <TriangleDownIcon color="neutral.50" boxSize={3} cursor="pointer" />
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem colSpan={2} colStart={17}>
                <Flex alignItems="center" gap={2}>
                    <Text>Sources</Text>
                    <Flex flexDirection="column">
                        <TriangleUpIcon color="neutral.50" boxSize={3} cursor="pointer" />

                        <TriangleDownIcon color="neutral.50" boxSize={3} cursor="pointer" />
                    </Flex>
                </Flex>
                </GridItem>
        </Grid> */}
        </>
    );
}

export default CreatedInsightTabs;
