import {
  FormControl,
  Select,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SettingBlock, SettingFormLabel, SettingTitle } from "../common";
import { useUserSetting } from "../../../api/queries";
import { useUpdateUserSettingMutation } from "../../../api/mutations/userIndex";

const TextToAudioSettings = () => {
  const settingFormLabelColor = useColorModeValue("neutral.100", "neutral.10");

  const { data: userSetting } = useUserSetting();
  const updateSettingMutation = useUpdateUserSettingMutation();

  const [selectedVoice, setSelectedVoice] = useState<string>();

  const onLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!userSetting) return;
      const voice = e.target.value;

      setSelectedVoice(voice);
      updateSettingMutation.mutate({
        ...userSetting,
        textToAudioSetting: {
          ...userSetting.textToAudioSetting,
          voice: voice,
        }
      });
    },
    [updateSettingMutation, userSetting]
  );

  useEffect(() => {
    if (userSetting?.textToAudioSetting.voice) {
      setSelectedVoice(userSetting?.textToAudioSetting.voice);
    }
  }, [userSetting]);

  return (
    <VStack spacing={4} align="stretch">
      <SettingTitle>Text to Audio Settings</SettingTitle>
      <SettingBlock>
        <FormControl>
          <SettingFormLabel color={settingFormLabelColor}>
            Standard voices
          </SettingFormLabel>
          <Select
            size="md"
            onChange={onLanguageChange}
            value={selectedVoice || "alloy"}
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </Select>
        </FormControl>
      </SettingBlock>
    </VStack>
  );
};

export default TextToAudioSettings;
