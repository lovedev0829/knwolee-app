import {
    Box,
    Button,
    Flex,
    // Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CheckCircleIconCustom from "src/Icons/CheckCircleIconCustom";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import { SubscriptionPlan } from "src/types/subscription.interface";
// import { Link as RouterLink } from "react-router-dom"

const planMainFeatureList = [
    "GPT 3.5 Turbo",
    "1,500,000 chat credits",
    "Up to 100 document uploads",
    "Up to 7 Online Data Sources",
];

interface Props {
    isCurrentPlan: boolean;
    isLoading: boolean;
    onUpgrade(): void;
    subscriptionPlan: SubscriptionPlan;
}

function FreeSubscriptionPlanCard({
    isCurrentPlan,
    isLoading,
    onUpgrade,
    subscriptionPlan,
}: Props) {
    const cardBackgroundColor = useColorModeValue("#FFF", "neutral.100");
    const cardTextColor = useColorModeValue("neutral.90", "neutral.20");
    const priceTextColor = useColorModeValue("neutral.100", "neutral.10");
    // const secondaryTextColor = useColorModeValue("neutral.50", "neutral.70");
    const priceDescriptionColor = useColorModeValue("neutral.60", "neutral.50");
    const borderColor = useColorModeValue("neutral.20", "#232627");
    const checkIconFillColor = useColorModeValue("#B0B3B5", "#4A4D4F");
    const linkBorderColor = useColorModeValue("neutral.30", "#232627");

    const [buttonText, setButtonText] = useState("Current plan");

    const { data: userSubscriptionRes } = useGetUserSubscription();

    useEffect(() => {
        if (isCurrentPlan) {
            return setButtonText("Current plan");
        }
        if (userSubscriptionRes?.userSubscription?.plan) {
            if (typeof userSubscriptionRes?.userSubscription?.plan === "string") {
                return setButtonText("Current plan");
            }
            const planPriority = subscriptionPlan?.priority;
            const currentPlanPriority =
                userSubscriptionRes?.userSubscription?.plan?.priority;
            if (currentPlanPriority > planPriority) {
                return setButtonText("Downgrade");
            } else if (currentPlanPriority < planPriority) {
                return setButtonText("Upgrade");
            }
    }
    }, [
        isCurrentPlan,
        subscriptionPlan?.priority,
        userSubscriptionRes?.userSubscription?.plan,
    ]);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            px={"6"}
            py={"8"}
            gap={"6"}
            borderTopLeftRadius={"24"}
            borderBottomLeftRadius={"24"}
            backgroundColor={cardBackgroundColor}
            flex={"1 0 0"}
        >
            <Flex
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"1"}
                alignSelf={"stretch"}
                textColor={cardTextColor}
            >
                <Text
                    fontSize={"31px"}
                    fontWeight={"700"}
                >
                    Free
                </Text>
                <Text
                    fontSize={"13px"}
                    fontWeight={"500"}
                >
                    Taste Knowlee's potential
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
                        fontSize={"28px"}
                        fontWeight={"700"}
                    >
                        Free forever
                    </Text>
                </Flex>
                <Text
                    textColor={priceDescriptionColor}
                    fontSize={"16px"}
                    fontWeight={"500"}
                >
                    No credit card required
                </Text>
            </Flex>
            <Flex
                pt={"6"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"8"}
                alignSelf={"stretch"}
                borderTop={"1px solid"}
                borderColor={borderColor}
            >
                <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    gap={"4"}
                    alignSelf={"stretch"}
                >
                    {planMainFeatureList.map((feature) => {
                        return (
                            <Flex
                                alignItems={"flex-start"}
                                gap={"3"}
                                alignSelf={"stretch"}
                                key={feature}
                            >
                                <CheckCircleIconCustom fill={checkIconFillColor} />
                                <Text
                                    flex={"1 0 0"}
                                    color={cardTextColor}
                                    fontSize={"13px"}
                                    fontWeight={"500"}
                                    lineHeight={"20px"}
                                >
                                    {feature}
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>

                <Button
                    width={"full"}
                    px={"6"}
                    py={"3"}
                    borderRadius={"10px"}
                    border={"2px solid"}
                    borderColor={linkBorderColor}
                    bg={"transparent"}
                    textColor={cardTextColor}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    _hover={{}}
                    // as={RouterLink}
                    textAlign={"center"}
                    // to={"https://www.google.com"}
                    onClick={onUpgrade}
                    isLoading={isLoading}
                    isDisabled={isCurrentPlan}
                >
                    {buttonText}
                </Button>
            </Flex>
        </Box>
    );
}

export default FreeSubscriptionPlanCard;
