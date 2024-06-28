import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CoreFeatures from "src/components/Subscription/CoreFeatures";
import EnterpriseSubscriptionPlanCard from "src/components/Subscription/EnterpriseSubscriptionPlanCard";
import FreeSubscriptionPlanCard from "src/components/Subscription/FreeSubscriptionPlanCard";
import BasicSubscriptionPlanCard from "src/components/Subscription/BasicSubscriptionPlanCard";
import ProSubscriptionPlanCard from "src/components/Subscription/ProSubscriptionPlanCard";
import SubscriptionFAQ from "src/components/Subscription/SubscriptionFAQ";
import Slider from "react-slick";
import MobileMenuIcon from "src/Icons/MobileMenuIcon";
import MobileMenuDrawer from "src/components/PageContainer/MobileMenuDrawer";
import { ModelType, PlanDuration } from "src/api/requests/stripeIndex";
import { useStipePaymentMutation } from "src/api/mutations/stripeIndex";
import {
  useFreeSubscriptionPlan,
  useGetSubscriptions,
  useGetUserSubscription,
} from "src/api/queries/subscriptionQuery";
import UpgradeConfirmationModal from "src/components/Modal/UpgradeConfirmationModal";
import DowngradeQuestionModal from "src/components/Modal/subscription/DowngradeQuestionModal";
import { SubscriptionFeature, SubscriptionPlan } from "src/types/subscription.interface";
import { Select } from "chakra-react-select";
import { useUserData } from "src/api/queries";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
};

const Subscriptions = () => {
  const toast = useToast();
  const { isOpen: isOpenMobileMenu, onOpen: onOpenMobileMenu, onClose: onCloseMobileMenu } = useDisclosure();
  const {
    isOpen: isOpenUpgradeModal,
    onOpen: onOpenUpgradeModal,
    onClose: onCloseUpgradeModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDowngradeQuestionModal,
    onClose: onCloseDowngradeQuestionModal,
    onOpen: openDowngradeQuestionModal,
  } = useDisclosure();
  const [planDuration, setPlanDuration] = useState<PlanDuration>("yearly");
  const [modelType, setmodelType] = useState<ModelType>("GPT 4o");
  const [currentStripePriceId, setCurrentStripePriceId] = useState("");
  const [upgradeStripePriceId, setUpgradeStripePriceId] = useState("");

  const mainBackground = useColorModeValue(
    "linear-gradient(180deg, #F3F5F7 0%, #FDFDFD 100%)",
    "#232627"
  );
  const headingColor = useColorModeValue("neutral.100", "neutral.10");
  const subHeadingColor = useColorModeValue("neutral.60", "neutral.50");

  const { mutateAsync: stripePayment, isLoading, variables } = useStipePaymentMutation();
  const { isLoading: isLoadingSubscriptionData, data: subscriptionsResponse } = useGetSubscriptions();
  const { data: freeSubscriptionPlan } = useFreeSubscriptionPlan();
  const { data: userData } = useUserData();

  const subscriptionData = subscriptionsResponse?.find((subscription) => subscription._id === planDuration)
  const subscriptions = subscriptionData?.subscriptions.filter((subscription) =>
    subscription.openai_model === modelType
  );

  const { data: userSubscriptionRes } = useGetUserSubscription();

  const modelOptions: { label: ModelType; value: ModelType; }[] = [
    {
      label: "GPT 3.5 Turbo",
      value: "GPT 3.5 Turbo",
    },
    {
      label: "GPT 4o",
      value: "GPT 4o",
    }
  ]

  const DEFAULT_MODEL = {
    label: modelType,
    value: modelType,
  };

  function onUpgradeClick(subscriptionPlan: SubscriptionPlan) {
    const { stripePriceId: priceId, priority = 0 } = subscriptionPlan;
    const currentPlanPriority =
      (userSubscriptionRes?.userSubscription?.plan as SubscriptionFeature)
        ?.priority || 0;
    if (currentPlanPriority >= priority) {
      openDowngradeQuestionModal();
    } else {
      onOpenUpgradeModal();
    }
    setUpgradeStripePriceId(priceId);
  }

  async function onUpgradeConfirm() {
    onCloseUpgradeModal();
    const data = await stripePayment({
      planDuration,
      priceId: upgradeStripePriceId,
      tolt_referral: window?.tolt_referral,
    });
    if ((data as { url?: string })?.url) {
      window.location.href = (data as { url: string }).url;
      return;
    }
    setCurrentStripePriceId(upgradeStripePriceId);
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
      newPlan: subscriptions?.find(sub => sub.stripePriceId === upgradeStripePriceId)?.name,
      price: subscriptions?.find(sub => sub.stripePriceId === upgradeStripePriceId)?.price
    });
  }

  useEffect(() => {
    if (userSubscriptionRes?.userSubscription?.stripePriceId) {
      setCurrentStripePriceId(userSubscriptionRes.userSubscription.stripePriceId);
    }
  }, [userSubscriptionRes?.userSubscription?.stripePriceId])

  const renderPricingCards = () => {
    if (isLoadingSubscriptionData) {
      return (
        <Box
          mt={"16"}
          px={"10"}
          display={["none", "none", "flex"]}
          gap={"2px"}
          alignItems={"center"}
        >
          <Flex alignItems="center" w="100%" justifyContent="center">
            <Spinner speed="0.8s" color="primary.50" />
          </Flex>
        </Box>
      );
    }
    return (
      <>
        {/* web view */}
        <Box
          mt={"16"}
          px={"10"}
          display={["none", "none", "flex"]}
          gap={"2px"}
          alignItems={"center"}
        >
          {freeSubscriptionPlan && (
            <FreeSubscriptionPlanCard
              isCurrentPlan={
                freeSubscriptionPlan.stripePriceId === currentStripePriceId
              }
              isLoading={
                isLoading &&
                variables?.priceId === freeSubscriptionPlan.stripePriceId
              }
              onUpgrade={() => onUpgradeClick(freeSubscriptionPlan)}
              subscriptionPlan={freeSubscriptionPlan}
            />
          )}
          {subscriptions?.map((subscription) =>
            subscription.subscriptionFeature.planType === "basic" ? (
              <BasicSubscriptionPlanCard
                key={subscription._id}
                onUpgrade={() => onUpgradeClick(subscription)}
                isLoading={
                  isLoading && variables?.priceId === subscription.stripePriceId
                }
                price={subscription.subscriptionFeature.price}
                fullprice={subscription.subscriptionFeature?.fullprice}
                subscriptionPlan={subscription}
                isCurrentPlan={
                  subscription?.stripePriceId === currentStripePriceId
                }
                planDuration={planDuration}
              />
            ) : (
              <ProSubscriptionPlanCard
                key={subscription._id}
                onUpgrade={() => onUpgradeClick(subscription)}
                isLoading={
                  isLoading && variables?.priceId === subscription.stripePriceId
                }
                price={subscription.subscriptionFeature.price}
                fullprice={subscription.subscriptionFeature?.fullprice}
                subscriptionPlan={subscription}
                isCurrentPlan={
                  subscription?.stripePriceId === currentStripePriceId
                }
                planDuration={planDuration}
              />
            )
          )}
          <EnterpriseSubscriptionPlanCard />
        </Box>

        {/* Mobile */}
        <Box
          display={["block", "block", "none"]}
          mt="8"
          className="subscription-slider-wrapper"
        >
          <Slider {...sliderSettings}>
            {freeSubscriptionPlan && (
              <FreeSubscriptionPlanCard
                isCurrentPlan={
                  freeSubscriptionPlan.stripePriceId === currentStripePriceId
                }
                isLoading={
                  isLoading &&
                  variables?.priceId === freeSubscriptionPlan.stripePriceId
                }
                onUpgrade={() => onUpgradeClick(freeSubscriptionPlan)}
                subscriptionPlan={freeSubscriptionPlan}
              />
            )}
            {subscriptions?.map((subscription) =>
              subscription.subscriptionFeature.planType === "basic" ? (
                <BasicSubscriptionPlanCard
                  key={subscription._id}
                  onUpgrade={() => onUpgradeClick(subscription)}
                  isLoading={
                    isLoading &&
                    variables?.priceId === subscription.stripePriceId
                  }
                  price={subscription.subscriptionFeature.price}
                  fullprice={subscription.subscriptionFeature?.fullprice}
                  subscriptionPlan={subscription}
                  isCurrentPlan={
                    subscription?.stripePriceId === currentStripePriceId
                  }
                  planDuration={planDuration}
                />
              ) : (
                <ProSubscriptionPlanCard
                  key={subscription._id}
                  onUpgrade={() => onUpgradeClick(subscription)}
                  isLoading={
                    isLoading &&
                    variables?.priceId === subscription.stripePriceId
                  }
                  price={subscription.subscriptionFeature.price}
                  fullprice={subscription.subscriptionFeature.fullprice}
                  subscriptionPlan={subscription}
                  isCurrentPlan={
                    subscription?.stripePriceId === currentStripePriceId
                  }
                  planDuration={planDuration}
                />
              )
            )}
            <EnterpriseSubscriptionPlanCard />
          </Slider>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        className="scroll-hover"
        position={"relative"}
        minW={"full"}
        borderRadius={"2rem"}
        background={mainBackground}
        overflow={"auto"}
      >
        {/* Drawer for mobile screens */}
        <Box display={["flex", "flex", "none"]} justifyContent="end" paddingRight="8px">
          <Button
            variant="unstyled"
            onClick={onOpenMobileMenu}
            display="flex"
            justifyContent="end"
          >
            <MobileMenuIcon />
          </Button>
          <MobileMenuDrawer
            isOpen={isOpenMobileMenu}
            onClose={onCloseMobileMenu}
          />
        </Box>
        <Box
          mt={["10", "16", "20"]}
          textAlign={"center"}
          display={"flex"}
          flexDirection={"column"}
          gap={"4"}
          padding="0 12px"
        >
          <Text color={headingColor} fontSize={["36px", "36px", "49px"]} fontWeight={700}>
            AI made affordable
          </Text>
          <Text color={subHeadingColor} fontSize={"20px"}>
            Pricing Plans for every budget
          </Text>
        </Box>
        <Box mt={["3", "4", "8"]} display={"flex"} flexDirection={"column"} gap={"2"}>
          <Text
            textAlign={"center"}
            color={headingColor}
            fontSize={["28px", "28px", "31px"]}
            fontWeight={700}
          >
            Choose plan
          </Text>
          <Flex justifyContent={"center"}>
            <RadioGroup
              value={planDuration}
              onChange={(nextValue: PlanDuration) => {
                setPlanDuration(nextValue);
              }}
            >
              <Stack direction={["column", "column", "row"]} gap={"4"}>
                <Radio
                  value="yearly"
                  _dark={{
                    color: "neutral.10",
                    bg: planDuration === "yearly" ? "primary.50" : undefined,
                    borderColor: planDuration === "yearly" ? "transparent" : undefined
                  }}
                >
                  <Text
                    color={planDuration === "yearly" ? headingColor : subHeadingColor}
                    fontSize={"13px"}
                    fontWeight={planDuration === "yearly" ? "500" : "400"}
                  >
                    Yearly (-10%)
                  </Text>
                </Radio>
                <Radio
                  value="monthly"
                  _dark={{
                    color: "neutral.10",
                    bg: planDuration === "monthly" ? "primary.50" : undefined,
                    borderColor: planDuration === "monthly" ? "transparent" : undefined
                  }}
                >
                  <Text
                    color={planDuration === "monthly" ? headingColor : subHeadingColor}
                    fontSize={"13px"}
                    fontWeight={planDuration === "monthly" ? "500" : "400"}
                  >
                    Monthly
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>
        <Flex justifyContent="center" mt={4}>
          <Select
            placeholder="Select option"
            chakraStyles={{
              control: (provided) => ({
                ...provided,
                minWidth: "250px",
              })
            }}
            menuPosition="fixed"
            value={DEFAULT_MODEL}
            options={modelOptions}
            onChange={(selected) => {
              setmodelType(selected?.value as ModelType);
            }}
          />
        </Flex>
        {renderPricingCards()}
        <CoreFeatures />
        <SubscriptionFAQ />
      </Box>
      <UpgradeConfirmationModal
        isOpen={isOpenUpgradeModal}
        onClose={onCloseUpgradeModal}
        onConfirm={onUpgradeConfirm}
        confirmButtonProps={{ isDisabled: isLoading, isLoading: isLoading }}
      />
      <DowngradeQuestionModal
        isOpen={isOpenDowngradeQuestionModal}
        onClose={onCloseDowngradeQuestionModal}
        upgradeSubscription={onUpgradeConfirm}
      />
    </>
  );
};

export default Subscriptions;
