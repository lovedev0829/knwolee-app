import { Text, useColorMode } from "@chakra-ui/react";

export const Description: React.FC<{ text: string }> = ({
  text,
  ...props
}) => {
  const { colorMode } = useColorMode();

  return (
    <Text
      color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
      fontSize="16px"
      lineHeight="24px"
      mt="16px"
      mb="32px"
      fontWeight="400"
      {...props}
    >
      {text}
    </Text>
  );
};
