import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

interface CreditsCounterProps {
  counter: number;
  setCounter: (value: number) => void;
}

const CreditsCounter = ({ counter, setCounter }: CreditsCounterProps) => {

  const handleIncrement = () => {
    setCounter(counter + 100000);
  };

  const handleDecrement = () => {
    if (counter <= 0) return;
    setCounter(counter - 100000);
  };

  return (
    <Flex justifyContent="space-around" py={"16px"} alignItems="center">
      <IconButton
        onClick={handleDecrement}
        aria-label="Remove credits"
        isDisabled={counter <= 100000}
        icon={<MinusIcon color={"neutral.60"} />}
        variant="ghost"
      />
      <Text
        textAlign="center"
        fontFamily="Roboto"
        fontSize="18px"
        fontStyle="normal"
        fontWeight="500"
        lineHeight="28px"
        color={"neutral.60"}
      >
        {counter.toLocaleString()}
      </Text>
      <IconButton
        onClick={handleIncrement}
        aria-label="Add credits"
        icon={<SmallAddIcon color={"neutral.60"} fontSize={"1.7rem"} />}
        variant="ghost"
      />
    </Flex>
  );
};

export default CreditsCounter;
