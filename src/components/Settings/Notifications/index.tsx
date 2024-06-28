import React, { useCallback, useEffect, useState } from 'react';
import {
  Flex,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { SectionHeading, SettingBlock, SettingCheckbox, SettingTitle } from '../common';
import { initialNotificationSetting, getNotificationSettingWithValue } from './mockups';
import { useUserSetting } from '../../../api/queries';
import { useUpdateUserSettingMutation } from '../../../api/mutations/userIndex';
import { NotificationSetting, NotificationSettingOption, Platform } from '../../../types';
import { SOURCE_TYPES } from '../../../utils/types';
import { NOTIFICATION_SETTINGS_OPTIONS } from '../../../utils/constants';


interface OptionType {
  title: string;
  key: keyof NotificationSetting;
}

const inAppOptions: OptionType[] = [
  {
    title: "Platform Updates and Announcements",
    key: 'inAppPlatformUpdatesAndAnnouncements'
  },
  {
    title: "Special Offers and Promotions",
    key: 'inAppSpecialOffersAndPromotions'
  }
]

const emailOptions: OptionType[] = [
  {
    title: "Platform Updates and Announcements",
    key: 'emailPlatformUpdatesAndAnnouncements'
  },
  {
    title: "Special Offers and Promotions",
    key: 'emailSpecialOffersAndPromotions'
  }
]

const Notifications: React.FC = () => {
  
  const { data: userSetting } = useUserSetting();
  const updateSettingMutation = useUpdateUserSettingMutation();
  const [setting, setSetting] = useState<NotificationSetting>(initialNotificationSetting);


  const isPlatform = (key: string): key is Platform => {
    return Object.values(SOURCE_TYPES).some((platform) => platform === key);
  }

  const isSettingOption = (key: string): key is NotificationSettingOption => {
    return Object.values(NOTIFICATION_SETTINGS_OPTIONS).some((option: NotificationSettingOption) => option === key);
  }

  const handleToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSetting = { ...setting, [e.target.name]: e.target.checked }
    setSetting(updatedSetting);
    updateSettingMutation.mutate({ ...userSetting!, notification: updatedSetting });
  }, [setting, updateSettingMutation, userSetting]);

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userSetting) return;
    const newValue = getNotificationSettingWithValue(e.target.checked);
    setSetting(newValue);
    updateSettingMutation.mutate({ ...userSetting, notification: newValue });
  };

  useEffect(() => {
    if (userSetting?.notification) {
      setSetting(userSetting.notification);
    }
  }, [userSetting]);

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <Flex alignItems="center" justify="space-between">
        <SettingTitle>Notifications</SettingTitle>
        <Switch
          size="md"
          onChange={toggleAll}
          isChecked={Object.values(setting).every(Boolean)}
        />
      </Flex>
      <SettingBlock>
        <SectionHeading>Email</SectionHeading>
        {emailOptions.map(option => {
          return <SettingCheckbox
            id={option.key}
            name={option.key}
            isChecked={setting[option.key]}
            onChange={handleToggle}
            key={option.key}
          >
            {option.title}
          </SettingCheckbox>
        })}
      </SettingBlock>
      <SettingBlock>
        <SectionHeading>In-App</SectionHeading>
        {inAppOptions.map(option => {
          return <SettingCheckbox
            id={option.key}
            name={option.key}
            isChecked={setting[option.key]}
            onChange={handleToggle}
            key={option.key}
          >
            {option.title}
          </SettingCheckbox>
        })}
      </SettingBlock>
    </VStack>
  );
}

export default Notifications;