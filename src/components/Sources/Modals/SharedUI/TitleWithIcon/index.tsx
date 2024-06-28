import { Box, Text, useColorMode } from "@chakra-ui/react";

const TitleWithIcon = ({
  title,
  iconColor,
  icon,
}: {
  title: string;
  iconColor: string;
  icon: React.ReactNode;
  }) => {
  const { colorMode } = useColorMode();

  return (
  <Box
    display="flex"
    height="60px"
    alignItems="center"
    gap="16px"
    alignSelf="stretch"
  >
    <Box
      w="60px"
      h="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="10px"
      bg={iconColor}
    >
      {icon}
    </Box>
      <Text
        color={colorMode === "dark" ? "neutral.10" : "neutral.90"}
        fontWeight="500"
        fontSize="16px"
        lineHeight="24px"
      >
      {title}
    </Text>
  </Box>
  )
};

export default TitleWithIcon;