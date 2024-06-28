import {
  Button,
  FormControl,
  Input,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { SettingBlock, SettingFormLabel, SettingTitle, SubmitButton } from "../common";
import { useAddOpenAIAPIKeyMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";

const ApiKey: React.FC = () => {
  const settingFormLabelColor = useColorModeValue(undefined, "neutral.10");
  const inputBorderColor = useColorModeValue("neutral.30", "neutral.80");
  const [apiKey, setAPIKey] = useState("");

  const { data: thirdPartyConfig } = useThirdPartyConfig();

  const { mutateAsync: addOpenAIKey, isLoading: addingAPIKey } = useAddOpenAIAPIKeyMutation();

  async function handleAddKey() {
    await addOpenAIKey({ apiKey });
  }

  useEffect(() => {
    if (thirdPartyConfig?.openai?.apiKey) {
      setAPIKey(thirdPartyConfig?.openai?.apiKey);
    }
  }, [thirdPartyConfig?.openai?.apiKey]);

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <SettingTitle>ApiKey Settings</SettingTitle>
      <SettingBlock>
        <FormControl>
          <SettingFormLabel color={settingFormLabelColor}>
            Unlimited tokens? Use Your OpenAI API Key!
            <Tooltip
              label="Use your OpenAI API Key for unlimited tokens."
              fontSize="sm"
            >
              <span>
                <InfoOutlineIcon
                  cursor="pointer"
                  boxSize="14px"
                  mb="1"
                  ml="2"
                  color="primary.50"
                />
              </span>
            </Tooltip>
          </SettingFormLabel>
          <Input
            fontSize="16px"
            lineHeight="24px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={inputBorderColor}
            placeholder="Input the OpenAI API Key"
            // onChange={}
            value={apiKey}
            onChange={(e) => setAPIKey(e.target.value)}
            // required={true}
          />
        </FormControl>
      </SettingBlock>
      {/* <SubmitButton isLoading={addingAPIKey} onClick={handleAddKey} isDisabled={!apiKey}> */}
      <SubmitButton isLoading={addingAPIKey} onClick={handleAddKey} isDisabled={true}> 
        Coming soon!
      </SubmitButton>
    </VStack>
  );
};

export default ApiKey;
