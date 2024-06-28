import { FormControl, Button, VStack, useColorMode, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Preference } from 'src/types';
import { useNavigate } from 'react-router-dom';
import {
  SettingBlock, SettingCheckbox, SettingFormLabel, SettingTitle
} from '../common';
import { useUserSetting } from '../../../api/queries';
import { useUpdateUserSettingMutation } from '../../../api/mutations/userIndex';
import styled from "styled-components";
import { useGetUserSubscription } from "src/api/queries/subscriptionQuery";
import CreditManager from "src/components/Modal/CreditManager";
import { useBillingManagerModalStore } from "src/store";
import Invoices from './Invoices';

const DataBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 16px; 
`;

const UserStatus = styled.div`
  display: flex;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #e8c547;

  color: "#191A1A" !important;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode()
  const { data: userSetting } = useUserSetting();
  const updateSettingMutation = useUpdateUserSettingMutation();
  const [setting, setSetting] = useState<Preference>();
  const { data: userSubsriptionRes } = useGetUserSubscription();
  const { isOpen, open, close } = useBillingManagerModalStore(); // Destructure `open` method here
  // Define an onConfirm function
  const onConfirm = () => {
    // console.log('User confirmed the action.');
    // Here, add the logic for what should happen after confirmation
    close(); // Assuming you want to close the modal on confirm
  };

  function getCurrentPlanName() {
    const defaultPlanName = "Beta";
    if (userSubsriptionRes?.userSubscription?.plan) {
      if (typeof userSubsriptionRes?.userSubscription?.plan === "string") {
        return defaultPlanName;
      }
      return userSubsriptionRes?.userSubscription?.plan?.name;
    }
    return defaultPlanName;
  }
  const onLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!userSetting) return;
    const newPreference = { ...setting, language: e.target.value };
    setSetting(prev => ({ ...prev, language: e.target.value }));
    updateSettingMutation.mutate({ ...userSetting, preference: newPreference });
  }, [setting, userSetting]);

  useEffect(() => {
    if (userSetting?.preference) {
      setSetting(userSetting.preference);
    }
  }, [userSetting]);

  const handleClick = () => {
    navigate('/subscriptions');
  };

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <SettingTitle>Billing Settings</SettingTitle>
      {/* <SettingBlock>
        <SettingCheckbox
          id="demo-1"
          name="demo-1"
        >Content type</SettingCheckbox>
        <SettingCheckbox
          id="demo-2"
          name="demo-2"
        >Content type</SettingCheckbox>
        <SettingCheckbox
          id="demo-3"
          name="demo-3"
        >Content type</SettingCheckbox>
        <SettingCheckbox
          id="demo-4"
          name="demo-4"
        >Content type</SettingCheckbox>
  </SettingBlock>*/}
      <SettingBlock>
        <FormControl>
          <SettingFormLabel
            color={colorMode == "dark" ? "neutral.10" : undefined}
          >
            Your current plan is
          </SettingFormLabel>
          <DataBox>
            <UserStatus>
              <Text color={"neutral.90"} fontWeight={"medium"}>
                {getCurrentPlanName()}
              </Text>
            </UserStatus>
          </DataBox>
        </FormControl>   <FormControl>
          <SettingFormLabel
            color={colorMode == "dark" ? "neutral.10" : undefined}
          >
            To manage your subscription click the button below
          </SettingFormLabel>
          <DataBox >
          <Button
              px="24px"
              py="12px"
              borderRadius="10px"
              borderWidth="2px"
              borderStyle="solid"
              // borderColor={borderColor}
              fontSize="16px"
              fontWeight="500"
              lineHeight="24px"
              // color={textColor}
              backgroundColor="transparent"
              onClick={handleClick} // Use the `open` method here
              _hover={{}}
            >
              Manage Subscription
            </Button>
            <Button
              px="24px"
              py="12px"
              borderRadius="10px"
              borderWidth="2px"
              borderStyle="solid"
              // borderColor={borderColor}
              fontSize="16px"
              fontWeight="500"
              lineHeight="24px"
              // color={textColor}
              backgroundColor="transparent"
              onClick={open} // Use the `open` method here
              _hover={{}}
            >
              Buy Credits
            </Button>
          </DataBox>
        </FormControl>
        {/* <BillingManager isOpen={isOpen} onClose={close} onConfirm={onConfirm} /> */}
        <CreditManager isOpen={isOpen} onClose={close} onConfirm={onConfirm} />
      </SettingBlock>
      <Invoices />
    </VStack>
  );
}

export default Billing;