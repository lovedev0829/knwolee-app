import { FormControl, Select, VStack, useColorMode } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Preference } from 'src/types';
import {
  SettingBlock, SettingCheckbox, SettingFormLabel, SettingTitle
} from '../common';
import { languageNames } from './mockups';
import { useUserSetting } from '../../../api/queries';
import { useUpdateUserSettingMutation } from '../../../api/mutations/userIndex';


const Preferences: React.FC = () => {
  const { colorMode } = useColorMode()
  const { data: userSetting } = useUserSetting();
  const updateSettingMutation = useUpdateUserSettingMutation();
  const [setting, setSetting] = useState<Preference>();

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

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <SettingTitle>Preferences Settings</SettingTitle>
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
            Select AI Model
          </SettingFormLabel>
          <Select
            size="lg"
            value={setting?.language}
            onChange={onLanguageChange}
          >
            {
              Object.keys(languageNames).map(langCode =>
                <option key={langCode} value={langCode}>{languageNames[langCode]}</option>)
            }
          </Select>
        </FormControl>
      </SettingBlock>
    </VStack>
  );
}

export default Preferences;