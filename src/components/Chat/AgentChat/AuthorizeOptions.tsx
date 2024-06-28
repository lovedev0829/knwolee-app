import {
  Box,
  Button,
  ButtonProps,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { INewThreadPayload } from "src/api/mutations/agentThreads";
import { Conversation } from "src/components/Conversation/Conversations";
import GoogleAuthButton from "src/components/ThirdPartyConnectors/GoogleAuthButton";
import LinkedInAuthButton from "src/components/ThirdPartyConnectors/LinkedInAuthButton";
import MicrosoftAuthButton from "src/components/ThirdPartyConnectors/MicrosoftAuthButton";
import TwitterAuthButton from "src/components/ThirdPartyConnectors/TwitterAuthButton";
import MarkdownComponent from "src/components/common/Markdown/MarkdownComponent";
import MediumAuthButton from "src/components/ContentCreation/CreatedContent/MediumAuthButton";
import SlackAuthButton from "src/components/ThirdPartyConnectors/SlackAuthButton";
import TrelloAuthButton from "src/components/ThirdPartyConnectors/TrelloAuthButton";
import NotionAuthButton from "src/components/ThirdPartyConnectors/NotionAuthButton";
import DiscordAuthButton from "src/components/ThirdPartyConnectors/DiscordAuthButton";
import TelegramAuthButton from "src/components/ThirdPartyConnectors/TelegramAuthButton";
import TiktokAuthButton from "src/components/ThirdPartyConnectors/TiktokAuthButton";

type ButtonMap = {
  [key: string]: React.ReactElement<ButtonProps>;
};

const buttonMap: ButtonMap = {
  Google: <GoogleAuthButton />,
  Linkedin: <LinkedInAuthButton />,
  Microsoft: <MicrosoftAuthButton />,
  Twitter: <TwitterAuthButton />,
  Medium: <MediumAuthButton />,
  Slack: <SlackAuthButton />,
  Trello: <TrelloAuthButton />,
  Notion: <NotionAuthButton />,
  Discord: <DiscordAuthButton />,
  Telegram: <TelegramAuthButton />,
  TikTok: <TiktokAuthButton />
  // Add more providers and buttons as needed
};

type Props = {
  provider: string;
  setAgentId: React.Dispatch<React.SetStateAction<string>>;
  createNewUserAgentThreadMutation: UseMutationResult<
    Conversation | null,
    unknown,
    INewThreadPayload,
    unknown
  >;
  text: string;
};

function AuthorizeOptions({
  provider,
  setAgentId,
  createNewUserAgentThreadMutation,
  text,
}: Props) {
  const navigate = useNavigate();
  const assistantMessageBG = useColorModeValue(
    "rgba(231, 239, 254, 0.50)",
    "neutral.100"
  );
  const textColor = useColorModeValue("neutral.100", "neutral.10");

  return (
      <Box my={1}>
        <Box display={"flex"} alignItems={"flex-start"}>
          <Box
            bg={assistantMessageBG}
            textColor={textColor}
            alignItems={"center"}
            rounded={"2xl"}
            px={3}
            py={2}
            my={1}
            maxW={"67%"}
          >
            <MarkdownComponent>{text}</MarkdownComponent>

            <Flex mt={2} gap={2} justify={"left"}>
              {buttonMap[provider]}
              <Button
                variant="outline"
                onClick={() => {
                  setAgentId("");
                  navigate(`/knowleechats`);
                }}
                isLoading={createNewUserAgentThreadMutation?.isLoading}
              >
                Skip
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
  );
}

export default AuthorizeOptions;
