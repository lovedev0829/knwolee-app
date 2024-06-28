import { Flex, Img, Text, useColorMode } from "@chakra-ui/react";

const sourceData = [
  {
    icon: "/images/TwitterSocial.svg",
    title: "Twitter",
    url: "https://twitter.com/KnowleeAI",
  },
  {
    icon: "/images/InstagramSocial.svg",
    title: "Instagram",
    url: "https://www.instagram.com/knowlee.ai/",
  },
  {
    icon: "/images/DiscordSocial.svg",
    title: "Discord",
    url: "https://discord.gg/WQHnexwswS",
  },
  {
    icon: "/images/TelegramSocial.svg",
    title: "Telegram",
    url: "https://discord.gg/WQHnexwswS",
  },
  {
    icon: "/images/MediumSocial.svg",
    title: "Medium",
    url: "https://medium.com/@knowlee.ai",
  },
  {
    icon: "/images/Guides.svg",
    title: "User Guide",
    url: "/User_Guide.pdf",
  }/*,
  {
    icon: "/images/Docs.svg",
    title: "Docs",
    url: "https://discord.gg/WQHnexwswS",
  }*/,
  {
    icon: "/images/Tutorials.svg",
    title: "Give A Feedback",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfvHWmghgxXQJb5uaJiq0YTqvtkmWd7KfN1hp2b3uAZjaD6ag/viewform",
  },
];

export default function Community() {
  const { colorMode } = useColorMode()

  return (
    <Flex flexDir="column" minH={0} flex="1">
      <Flex
        className="scroll-hover"
        mt="24px"
        alignItems="flex-start"
        flexWrap="wrap"
        gap="16px"
        overflowY="auto"
      >
        {sourceData.map((item) => (
          <Flex
            key={item.title}
            width={["full", "calc(50% - 8px)", "300px", "242px"]}
            h="184px"
            borderRadius="20px"
            bg={colorMode === "dark" ? "#343839" : "neutral.15"}
            flexDir="column"
            alignItems="center"
            justify="center"
            _hover={{ cursor: 'pointer', bg: colorMode === "dark" ? undefined : 'neutral.20' }}
            onClick={() => window.open(item.url, "_blank")}
          >
            <Img w="80px" h="80px" mb="16px" alt="" src={item.icon} />
            <Text color="primary.100" fontWeight="500">
              {item.title}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
