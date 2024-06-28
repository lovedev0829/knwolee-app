import { useAuth0 } from "@auth0/auth0-react";
import { Flex, useBreakpointValue, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { useUserData } from "../api/queries";
import Sidebar from "../components/Sidebar";
import TermsOfService from "../pages/TermsOfService";
import { useEffect, useState } from "react";
import CookieBanner from "src/components/Banner/CookieBanner";
import SubscriptionLimit from "src/components/Modal/SubscriptionLimit/index";
import { useSubscriptionModalStore } from "src/store";
import NewOnboardingSegmentation from "src/components/NewOnboardingSegmentation";

export default function Root() {
  const [collapsed, setCollapsed] = useState(false);
  const wrapperBGColor = useColorModeValue("#ffffff", "#232627");
  const showSidebar = useBreakpointValue([false, false, true]);
  const { data: userData } = useUserData();
  const { user: userAuth0Data } = useAuth0();
  const { onClose } = useDisclosure({ isOpen: true });
  const { isOpen, close } = useSubscriptionModalStore()
  const [currentStep, setCurrentStep] = useState(userData?.onboardingStep || 1);

  useEffect(() => {
    setCurrentStep(userData?.onboardingStep || 1);
  }, [userData]);

  if (!userData || !userAuth0Data) return null;

  const onSegmentationClose = () => {
    if (!userData.isSegmentationCompleted) return;
    onClose();
  };

  const hasToAcceptTermsOfService = userData.hasAcceptedTosPp

  return (
    <Flex height="100vh" > 
      {!hasToAcceptTermsOfService ? (
        <TermsOfService />
      ) : (
        <>
          <NewOnboardingSegmentation
            isOpen={!userData.isSegmentationCompleted}
            onClose={onSegmentationClose}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          {!userData.cookiesAccepted && <CookieBanner />}
          {showSidebar && (
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          )}
          <Flex
            display="flex"
            backgroundColor="#0c0d0d"
            padding={["12px", "12px", "24px 24px 24px 0"]}
            height="100%"
            width="100%"
            maxWidth={`calc(100% - ${collapsed ? "104px" : "320px"})`}
            transition="all 0.3s ease"
            maxHeight="100vh"
            className="main-content-wrapper"
          >
            <Flex
              bgColor={wrapperBGColor}
              width="full"
              borderRadius={["20px", "20px", "2rem"]}
            >
              <Outlet />
            </Flex>
          </Flex>
          <SubscriptionLimit isOpen={isOpen} onClose={close} />
        </>
      )}
    </Flex>
  );
}