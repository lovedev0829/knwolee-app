import {
  Box,
  Container,
  Flex,
  useColorModeValue,
  Text,
  Button,
  FormControl,
  Select,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import UpgradePlanIcon from "src/Icons/subscription/UpgradePlanIcon";
import { useStipePaymentMutation } from "src/api/mutations/stripeIndex";
import {
  useGetSubscriptions,
  useGetUserSubscription,
} from "src/api/queries/subscriptionQuery";
import { PlanDuration } from "src/api/requests/stripeIndex";
import { useUserData } from "src/api/queries";
import {
  useBillingManagerModalStore,
  useSubscriptionModalStore,
} from "src/store";
import { SubscriptionPlan } from "src/types/subscription.interface";
import DowngradeQuestionModal from "../subscription/DowngradeQuestionModal";

const UpgradePlanCard = () => {
  const toast = useToast();
  const { close } = useSubscriptionModalStore();
  const { close: closeBillingManagerModal } = useBillingManagerModalStore();
  const {
    isOpen: isOpenDowngradeQuestionModal,
    onClose: onCloseDowngradeQuestionModal,
    onOpen: openDowngradeQuestionModal,
  } = useDisclosure();

  const { isLoading: isLoadingSubscriptionData, data: subscriptionsResponse } =
    useGetSubscriptions();

  const { data: userSubscriptionRes } = useGetUserSubscription();
  const { data: userData } = useUserData();
  const userCurrentPlanPriceId =
    userSubscriptionRes?.userSubscription.stripePriceId;
  
  const userCurrentPlanPriority =
    typeof userSubscriptionRes?.userSubscription.plan !== "string"
      ? userSubscriptionRes?.userSubscription.plan?.priority
      : 0;

  const subscriptionOptions =
    subscriptionsResponse &&
    subscriptionsResponse?.flatMap((item) => item.subscriptions);

  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const usersSubscription = subscriptionOptions?.find(
    (sub) => sub.stripePriceId === userCurrentPlanPriceId
  );
  const borderColor = useColorModeValue("neutral.30", "neutral.80");

  const subHeadingColor = useColorModeValue("#6C7275", "#6C7275");

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionPlan | null>(null);
  const { mutateAsync: stripePayment, isLoading: isPlanUpgading } =
    useStipePaymentMutation();

  async function upgradeSubscription() {
    // console.log("Upgrading subscription...", selectedSubscription);
    const data = await stripePayment({
      planDuration: selectedSubscription?.planType as PlanDuration,
      priceId: selectedSubscription?.stripePriceId as string,
      tolt_referral: window?.tolt_referral,
    });

    if ((data as { url?: string })?.url) {
      window.location.href = (data as { url: string }).url;
      return;
    }
    toast({
      title: "Subscription Updated Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Push event to GTM data layer
    window.dataLayer.push({
      event: 'subscriptionUpdate',
      email: userData?.email,
      newPlan: selectedSubscription?.name,
      price: selectedSubscription?.price
    });

    close();
    closeBillingManagerModal();
  }

  if (isLoadingSubscriptionData) {
    return (
      <Flex alignItems="center" justifyContent="center" h="36vh" minW="280px">
        <Spinner speed="0.8s" color="primary.50" />
      </Flex>
    );
  }

  const handleSubscriptionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!subscriptionOptions?.length || !event.target.value) return;
    const subscription = subscriptionOptions.find(
      (_) => _._id === event.target.value
    );
    if (!subscription) return;
    setSelectedSubscription(subscription);
    // console.log("Selected Subscription:", subscription);
  };

  const handleUpgradeSubscription = async () => {
    // console.log("Handle Upgrade Subscription called");
    if (!selectedSubscription?.planType || !selectedSubscription?.stripePriceId) {
      // console.log("Invalid subscription selected");
      return;
    }

    if (selectedSubscription?.priority < (userCurrentPlanPriority || 0)) {
      openDowngradeQuestionModal();
      return;
    }
    await upgradeSubscription();
  };

  return (
    <Container
      border={"1px solid"}
      borderRadius="10px"
      borderColor={borderColor}
      padding="7"
      maxWidth="inherit"
    >
      <Flex gap="16px">
        <UpgradePlanIcon />
        <Box>
          <Text
            color={headingTextColor}
            fontFamily="Roboto"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="30px"
          >
            Upgrade Plan
          </Text>
          <Text
            color={subHeadingColor}
            fontFamily="Roboto"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="24px"
          >
            Long-term savings.
          </Text>
        </Box>
      </Flex>

      <FormControl py={"16px"}>
        <Select
          size="md"
          onChange={handleSubscriptionSelect}
          value={selectedSubscription?._id || usersSubscription?._id}
        >
          {!!subscriptionOptions?.length &&
            subscriptionOptions.map((subscription) => {
              return (
                <option
                  key={subscription._id}
                  value={subscription._id}
                  disabled={
                    userCurrentPlanPriceId === subscription.stripePriceId
                  }
                >
                  {subscription.price && subscription.interval
                    ? `${subscription.name} - $${subscription.price} / ${subscription.interval}`
                    : `${subscription.name}`}
                </option>
              );
            })}
        </Select>
      </FormControl>

      <Button
        py={6}
        borderRadius={"12px"}
        bg={"primary.50"}
        color={"neutral.10"}
        _hover={{}}
        width={"full"}
        isDisabled={isPlanUpgading}
        isLoading={isPlanUpgading}
        onClick={handleUpgradeSubscription}
      >
        Upgrade
      </Button>
      <DowngradeQuestionModal
        isOpen={isOpenDowngradeQuestionModal}
        onClose={onCloseDowngradeQuestionModal}
        upgradeSubscription={upgradeSubscription}
      />
    </Container>
  );
};

export default UpgradePlanCard;
