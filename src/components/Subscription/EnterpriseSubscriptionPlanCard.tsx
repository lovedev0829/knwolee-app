import {
    Box,
    Button,
    Flex,
    // Link,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import CheckCircleIconCustom from "src/Icons/CheckCircleIconCustom"
import SendEmailModal from "../CommunitySupport/SendEmailModal";
// import { Link as RouterLink } from "react-router-dom"

const planMainFeatureList = [
    "Custom API Access",
    "Unlimited chat credits",
    "Off-the-shelf and custom integrations",
    "AI solutions and prompt engineering"
]

function EnterpriseSubscriptionPlanCard() {
    const cardBackgroundColor = useColorModeValue("neutral.90", "#E8ECEF");
    const cardTitleColor = useColorModeValue("primary.02", "#139843");
    // const popularTextColor = useColorModeValue("neutral.90", "neutral.10");
    const priceTextColor = useColorModeValue("neutral.10", "neutral.90");
    const secondaryTextColor = useColorModeValue("neutral.10", "neutral.90");

    const { isOpen: isOpenEmailModal, onClose: onCloseEmailModal, onOpen: onOpenEmailModal } = useDisclosure();

    return (
        <>
        <Box
            display={"flex"}
            flexDirection={"column"}
            px={"6"}
            py={"12"}
            gap={"6"}
            borderRadius={"24"}
            backgroundColor={cardBackgroundColor}
            flex={"1 0 0"}
        >
            <Flex
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"1"}
                alignSelf={"stretch"}
            >
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    alignSelf={"stretch"}
                >
                    <Text
                        fontSize={"31px"}
                        fontWeight={"700"}
                        color={cardTitleColor}
                    >
                        Enterprise
                    </Text>
                </Flex>
                <Text
                    fontSize={"13px"}
                    fontWeight={"500"}
                    color={secondaryTextColor}
                >
                    Large businesses, corporations
                </Text>
            </Flex>
            <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                gap={"2"}
                alignSelf={"stretch"}
            >
                <Flex
                    alignItems={"flex-end"}
                    gap={"2"}
                    alignSelf={"stretch"}
                >
                    <Text
                        textColor={priceTextColor}
                        fontSize={"31px"}
                        fontWeight={"700"}
                        lineHeight={"56px"}
                    >
                        Contact Us
                    </Text>

                </Flex>
                <Text
                    textColor={"neutral.60"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                >
                    Pervasive AI in your process
                </Text>
            </Flex>
            <Flex
                pt={"6"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"8"}
                alignSelf={"stretch"}
                borderTop={"1px solid"}
                borderColor={"neutral.80"}
            >
                <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    gap={"4"}
                    alignSelf={"stretch"}
                >
                    {planMainFeatureList.map(feature => {
                        return (
                            <Flex
                                alignItems={"flex-start"}
                                gap={"3"}
                                alignSelf={"stretch"}
                                key={feature}
                            >
                                <CheckCircleIconCustom fill={"#6C7275"} />
                                <Text
                                    flex={"1 0 0"}
                                    color={secondaryTextColor}
                                    fontSize={"13px"}
                                    fontWeight={"500"}
                                    lineHeight={"20px"}
                                >
                                    {feature}
                                </Text>
                            </Flex>
                        )
                    })}

                </Flex>

                <Button
                    width={"full"}
                    px={"6"}
                    py={"3"}
                    borderRadius={"10px"}
                    bg={"primary.50"}
                    textColor={"neutral.10"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    _hover={{}}
                    // as={RouterLink}
                    textAlign={"center"}
                        // to={"https://app.knowlee.ai"}
                        onClick={onOpenEmailModal}
                >
                    Contact
                </Button>

            </Flex>
        </Box>
            <SendEmailModal
                isOpen={isOpenEmailModal}
                onClose={onCloseEmailModal}
                onSubmit={console.log}
            />
        </>
    )
}

export default EnterpriseSubscriptionPlanCard