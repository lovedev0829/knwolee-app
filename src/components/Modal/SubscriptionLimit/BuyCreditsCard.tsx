import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import BuyCreditsIcon from "src/Icons/subscription/BuyCreditsIcon";
import CreditsCounter from "./CreditsCounter";
import { useStripeBuyCreditsMutation } from "src/api/mutations/stripeIndex";

const BuyCreditsCard = () => {
  const [counter, setCounter] = useState(100000); // Default quantity to 1

  const { mutateAsync: buyCredits, isLoading } = useStripeBuyCreditsMutation();

  const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
  const borderColor = useColorModeValue("neutral.30", "neutral.80");

  const subHeadingColor = useColorModeValue("#6C7275", "#6C7275");

  const handleBuyCredits = async () => {
    const response = await buyCredits({ 
      tolt_referral: window?.tolt_referral,
      quantity: counter // Include the counter value as quantity in the request
    });
    if ((response as { url?: string })?.url) {
      window.location.href = (response as { url: string }).url;
      return;
    }
  };
  return (
    <Container
      border={"1px solid"}
      borderRadius="10px"
      borderColor={borderColor}
      padding="7"
      maxWidth="inherit"
    >
      <Flex gap="16px">
        <BuyCreditsIcon />
        <Box>
          <Text
            color={headingTextColor}
            fontFamily="Roboto"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="30px"
          >
            Buy Credits
          </Text>
          <Text
            color={subHeadingColor}
            fontFamily="Roboto"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="24px"
          >
            Pay per usage. 1$ = 100,000 credits.
          </Text>
        </Box>
      </Flex>
      <CreditsCounter counter={counter} setCounter={setCounter}/> {/* Pass counter and setCounter as props */}
      <Button
        py={6}
        borderRadius={"12px"}
        bg={"secondary.50"}
        color={"neutral.10"}
        _hover={{}}
        width={"full"}
        onClick={handleBuyCredits}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Buy
      </Button>
    </Container>
  );
};

export default BuyCreditsCard;
