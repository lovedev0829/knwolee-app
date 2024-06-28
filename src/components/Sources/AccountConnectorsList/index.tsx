import { Box, Flex, Text, useColorMode, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import GoogleIcon from "src/Icons/GoogleIcon";
import MicrosoftIcon from "src/Icons/MicrosoftIcon";
import GoogleAuthButton from "src/components/ThirdPartyConnectors/GoogleAuthButton";
import LinkedinIcon from "src/Icons/LinkedinIcon";
import LinkedInAuthButton from "src/components/ThirdPartyConnectors/LinkedInAuthButton";
import MicrosoftAuthButton from "src/components/ThirdPartyConnectors/MicrosoftAuthButton";
import TwitterAuthButton from "src/components/ThirdPartyConnectors/TwitterAuthButton";
import MediumAuthButton from "src/components/ContentCreation/CreatedContent/MediumAuthButton";
import NotionAuthButton from "src/components/ThirdPartyConnectors/NotionAuthButton";
import MediumIcon from "src/Icons/MediumIcon";
import TwitterAuthIcon from "src/Icons/TwitterAuthIcon";
import SlackAuthButton from "src/components/ThirdPartyConnectors/SlackAuthButton";
import TrelloAuthButton from "src/components/ThirdPartyConnectors/TrelloAuthButton";
import TrelloLogo from "src/Icons/TrelloIcon";
import NotionIcon from "src/Icons/NotionIcon";
import SlackIcon from "src/Icons/SlackIcon";
import DiscordIcon from "src/Icons/DiscordIcon";
import DiscordAuthButton from "src/components/ThirdPartyConnectors/DiscordAuthButton";
import TelegramAuthButton from "src/components/ThirdPartyConnectors/TelegramAuthButton";
import TelegramIcon from "src/Icons/TelegramIcon";
import TikTokAuthButton from "src/components/ThirdPartyConnectors/TiktokAuthButton";
import TikTokIcon from "src/Icons/TikTokIcon";

export default function AccountConnectorsList() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("neutral.90" , "neutral.10");
  const borderColor = useColorModeValue("neutral.20", "#343839");
  const iconColor = useColorModeValue("black" , undefined);
  return (
    <Flex flexDir="column" minH={0} flex="1">
      <Text
        color={colorMode === "dark" ? "neutral.40" : "neutral.60"}
        fontSize="16px"
        fontWeight="500"
        lineHeight="24px"
        mt="24px"
      >
        Account Connectors
        <Tooltip
          label={
            <div>
              <Text fontWeight="normal" fontSize="sm">Connect your accounts to enable Knowlee assistants to manage them for you.</Text>
            </div>
          }
        >
          <span>
            <InfoIcon boxSize="12px" ml={2} />
          </span>
        </Tooltip>

      </Text>

      <Flex
        className="scroll-hover"
        mt="24px"
        alignItems="flex-start"
        flexWrap="wrap"
        gap="14px"
        overflowY="auto"
      >

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            // bg={iconColor}
            >
              <GoogleIcon />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Google
            </Text>
          </Box>
          <GoogleAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            // bg={iconColor}
            >
              <MicrosoftIcon />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Microsoft
            </Text>
          </Box>
          {/* need to Replace MicroSoftAuthButton here */}
          <MicrosoftAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
              <LinkedinIcon />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              LinkedIn
            </Text>
          </Box>
          <LinkedInAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            // bg={iconColor}
            >
              {/* <TwitterIcon fill={iconColor} /> */}
              <TwitterAuthIcon fill={iconColor} />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Twitter
            </Text>
          </Box>
          <TwitterAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
              // bg={iconColor}
            >
              <MediumIcon fill={iconColor}/>
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Medium
            </Text>
          </Box>
          <MediumAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
              <SlackIcon />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Slack
            </Text>
          </Box>
          <SlackAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
              <TrelloLogo />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Trello
            </Text>
          </Box>
          <TrelloAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
              <NotionIcon fill={iconColor} />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Notion
            </Text>
          </Box>
          <NotionAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
              {/* <DiscordIcon fill={iconColor} /> */}
              <DiscordIcon />
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Discord Bot
            </Text>
          </Box>
          <DiscordAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
              // bg={iconColor}
            >
              <TelegramIcon/>
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              Telegram
            </Text>
          </Box>
          <TelegramAuthButton />
        </Box>

        <Box
          display="flex"
          width={["full", "calc(50% - 8px)", "300px", "242px"]}
          padding="20px 24px"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          gap="20px"
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          backgroundColor="neutral.'01100'"
        >
          <Box
            display="flex"
            height="60px"
            alignItems="center"
            gap="16px"
            alignSelf="stretch"
            opacity={1}
          >
            <Box
              w="60px"
              h="60px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
            >
               <TikTokIcon/>
            </Box>
            <Text
              color={textColor}
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
            >
              TikTok
            </Text>
          </Box>
          <TikTokAuthButton />
        </Box>
      </Flex>
    </Flex>
  );
}