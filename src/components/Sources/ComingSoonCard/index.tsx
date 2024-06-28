import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import ClockIcon from "../../../Icons/ClockIcon";


const ComingSoonCard: React.FC = () => {
  const { colorMode } = useColorMode();
  return (
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
      borderColor={colorMode === "dark" ? "#343839" : "neutral.20"}
      backgroundColor="neutral.'01100'"
    >
      <Box
        display="flex"
        height="60px"
        alignItems="center"
        gap="16px"
        alignSelf="stretch"
      >
        <Text
          color={colorMode === "dark" ? "neutral.10" : "neutral.90"}
          fontWeight="500"
          fontSize="16px"
          lineHeight="24px"
          textAlign='center'
        >
          New sources are coming!
        </Text>
      </Box>

      <Button
        display="flex"
        padding="12px 24px"
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
        borderRadius="10px"
        border="2px solid"
        borderColor={colorMode === "dark" ? "#343839" : "neutral.30"}
        color={colorMode === "dark" ? "neutral.10" : "neutral.90"}
        bg={colorMode === "dark" ? "#232627" : "white"}
        leftIcon={<ClockIcon fill={colorMode === "dark" ? "#FEFEFE" : undefined} />}
        fontSize="16px"
        fontWeight="500"
        pointerEvents='none'
      >
        Coming Soon
      </Button>
    </Box>
  );
};

export default ComingSoonCard;
