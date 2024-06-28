import { CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import CheckIconCustom from "src/Icons/CheckIconCustom";

const featuresList = [
    {
        title: "Create AI Assistants",
        free: true,
        pro: true,
        enterprise: true,
    },
    {
        title: "Create AI Processes",
        free: true,
        pro: true,
        enterprise: true,
    },
    {
        title: "Assistants Full-Access to Internet",
        free: true,
        pro: true,
        enterprise: true,
    },
    {
        title: "API access for building your own integrations",
        free: false,
        pro: false,
        enterprise: true,
    },
    {
        title: "Custom AI Models",
        free: false,
        pro: false,
        enterprise: true,
    },
    //     {
    //         title: "Access to Static Data Source",
    //         free: { value: true, text: "Up to 10" },
    //         pro: { value: true, text: "Up to 20" },
    //         enterprise: { value: true, text: "Via email" },
    //     },
    //     {
    //         title: "Access to Dynamic Data Source",
    //         free: { value: true, text: "Up to 5" },
    //         pro: { value: true, text: "Up to 10" },
    //         enterprise: { value: true, text: "Via email" },
    //     },
    //     {
    //         title: "Custom API Access",
    //         free: false,
    //         pro: false,
    //         enterprise: { value: true, text: "Unlimited" },
    //     },
    //     {
    //         title: "Support",
    //         free: { value: true, text: "Via email" },
    //         pro: { value: true, text: "Via chat" },
    //         enterprise: { value: true, text: "Chat 24/7" },
    //     },
];

type IsAvailable =
    | {
        value: boolean;
        text: string;
    }
    | boolean;

interface FeatureAvailableItemProps {
    isAvailable: IsAvailable;
}

function FeatureAvailableItem({ isAvailable }: FeatureAvailableItemProps) {
    const closeIconColor = useColorModeValue("neutral.60", "neutral.50");
    const textColor = useColorModeValue("neutral.90", "neutral.20");

    if (typeof isAvailable === "boolean") {
        return (
            <Box px={[0, 0, "8"]} py={[0, 0, "5"]} >
                {isAvailable ? (
                    <CheckIconCustom />
                ) : (
                    <CloseIcon color={closeIconColor} />
                )}
            </Box>
        );
    }

    return (
        <Flex px={[0, 0, "8"]} py={[0, 0, "5"]} alignItems={"flex-start"} gap={"3"}>
            {isAvailable.value ? (
                <CheckIconCustom />
            ) : (
                <CloseIcon color={closeIconColor} />
            )}
            <Text
                color={textColor}
                fontSize={"13px"}
                fontWeight={"500"}
                lineHeight={"20px"}
            >
                {isAvailable.text}
            </Text>
        </Flex>
    );
}

function CoreFeatures() {
    const textColor = useColorModeValue("neutral.90", "neutral.20");
    const subTextColor = useColorModeValue("neutral.80", "neutral.30");

    return (
        <TableContainer px={"10"} pt={"14"} >
            <Table>
                <Thead
                    alignItems={"flex-start"}
                    gap={"2px"}
                    borderTop={"1px solid"}
                    borderColor={"neutral.0415"}
                    flexGrow={"1"}
                    py={"3"}
                >
                  <Tr>
                  <Th verticalAlign="top">
                        <Text
                            color={textColor}
                            fontSize={"25px"}
                            fontWeight={"500"}
                            lineHeight={"42px"}
                            textTransform="capitalize"
                        >
                            Core features
                        </Text>
                    </Th>
                    <Th
                        verticalAlign="top"
                        flexDirection={"column"}
                        alignItems={"flex-start"}
                        gap={"1"}
                        alignSelf={"stretch"}
                        px={"6"}
                        textTransform="capitalize"
                    >
                        <Text
                            color={textColor}
                            fontSize={"25px"}
                            fontWeight={"500"}
                            marginBottom="12px"
                            textTransform="capitalize"
                        >
                            Basic
                        </Text>
                        <Text color={subTextColor} fontSize={"13px"} fontWeight={"500"}>
                            Small businesses
                        </Text>
                    </Th>
                    <Th
                        verticalAlign="top"
                        flexDirection={"column"}
                        alignItems={"flex-start"}
                        gap={"1"}
                        alignSelf={"stretch"}
                        px={"6"}
                        textTransform="capitalize"
                    >
                        <Text
                            fontSize={"25px"}
                            fontWeight={"500"}
                            color={"primary.50"}
                            marginBottom="12px"
                            textTransform="capitalize"
                        >
                            Pro
                        </Text>
                        <Text color={subTextColor} fontSize={"13px"} fontWeight={"500"}>
                            For Professionals
                        </Text>
                    </Th>
                    <Th
                        verticalAlign="top"
                        flexDirection={"column"}
                        alignItems={"flex-start"}
                        gap={"1"}
                        alignSelf={"stretch"}
                        px={"6"}
                        textTransform="capitalize"
                    >
                        <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            alignSelf={"stretch"}
                            gap={"1"}
                            marginBottom="12px"
                        >
                            <Text fontSize={"25px"} fontWeight={"500"} color={"primary.02"}>
                                Enterprise
                            </Text>
                        </Flex>
                        <Text fontSize={"13px"} fontWeight={"500"} color={subTextColor}>
                            Corporations
                        </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {featuresList.map((feature, i) => {
                        return (
                            <Tr
                                key={i}
                                gap={"2px"}
                                borderTop={"1px solid"}
                                borderColor={"neutral.0415"}
                            >
                                <Td py={"5"}>
                                    <Text
                                        color={textColor}
                                        fontSize={"13px"}
                                        fontWeight={"500"}
                                        lineHeight={"20px"}
                                    >
                                        {feature.title}
                                    </Text>
                                </Td>
                                <Td>
                                    <FeatureAvailableItem isAvailable={feature.free} />
                                </Td>
                                <Td>
                                    <FeatureAvailableItem isAvailable={feature.pro} />
                                </Td>
                                <Td>
                                    <FeatureAvailableItem isAvailable={feature.enterprise} />
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default CoreFeatures;
