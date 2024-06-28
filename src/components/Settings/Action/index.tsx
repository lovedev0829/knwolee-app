import React, { useState, useCallback, useEffect } from 'react';
import { Text, VStack, useColorMode } from '@chakra-ui/react';
import type { SettingAction } from 'src/types';
import { SettingBlock, SettingCheckbox, SettingTitle } from '../common';
import { initialSettingAction } from './mockups';
import { useUserSetting } from '../../../api/queries';
import { useUpdateUserSettingMutation } from '../../../api/mutations/userIndex';

interface ActionProps {}

const Action: React.FC<ActionProps> = () => {
  const { colorMode } = useColorMode()
  const { data: userSetting } = useUserSetting();
  const updateSettingMutation = useUpdateUserSettingMutation();
  const [setting, setSetting] = useState<SettingAction>(initialSettingAction);

  const handleToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...setting, [e.target.name]: e.target.checked };
    setSetting(newValue);
    updateSettingMutation.mutate({ ...userSetting!, action: newValue });
  }, [setting, userSetting]);

  useEffect(() => {
    if (userSetting?.action) {
      setSetting(userSetting.action);
    }
  }, [userSetting]);

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <SettingTitle>Action</SettingTitle>
      <Text
        color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
        fontFamily="Roboto"
        fontSize="13px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="20px"
      >
        You can specify the actions Knowlee should take when a content is detected
      </Text>
      <SettingBlock>
        <SettingCheckbox
          id="include-saving-data"
          name="includeSavingData"
          isChecked={setting.includeSavingData}
          onChange={handleToggle}
        >Include Saving Data</SettingCheckbox>
        <SettingCheckbox
          id="notify"
          name="notify"
          isChecked={setting.notify}
          onChange={handleToggle}
        >Notify</SettingCheckbox>
        <SettingCheckbox
          id="analyzeData"
          name="analyzeData"
          isChecked={setting.analyzeData}
          onChange={handleToggle}
        >Analyzing Data</SettingCheckbox>
      </SettingBlock>
    </VStack>
  );
}

export default Action;