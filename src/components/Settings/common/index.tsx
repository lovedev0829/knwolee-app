import React from "react";
import { Button, Checkbox, Flex, FormLabel, Heading, VStack, useColorMode } from "@chakra-ui/react";
import type { ButtonProps, CheckboxProps, FormLabelProps, HeadingProps, StackProps } from "@chakra-ui/react";

export const SettingTitle: React.FC<HeadingProps> = (props) => {
  const { colorMode } = useColorMode()
  return (
  <Heading
    size="lg"
      fontSize={["26px", "26px", "26px", "31px"]}
    fontFamily="Roboto"
      color={colorMode === "dark" ? "neutral.10" : undefined}
    {...props}
    />
  )
}

export const SettingFormLabel: React.FC<FormLabelProps> = (props) => {
  const { colorMode } = useColorMode()

  return (
  <FormLabel
    fontSize="16px"
      color={colorMode == "dark" ? "neutral.30" : "neutral.100"}
    fontWeight="500"
    lineHeight="20px"
    {...props}
    />
  )
}


export const SubmitButton: React.FC<ButtonProps> = (props) =>
  <Button type="submit"
    colorScheme="blue"
    mt={4}
    width="100%"
    height="48px"
    fontSize="16px"
    fontWeight="500"
    fontFamily="Roboto"
    color="neutral.10"
    py="12px"
    background="primary.50"
    lineHeight="24px"
    {...props}
  />

export const SectionHeading: React.FC<HeadingProps> = (props) => {
  const { colorMode } = useColorMode()

  return (
    <Heading as="h4"
    fontSize="18px"
    fontFamily="Roboto"
    fontStyle="normal"
    fontWeight="600"
    lineHeight="32px"
    letterSpacing="-0.36px"
      color={colorMode === "dark" ? "neutral.20" : "neutral.07100"}
    {...props}
  />
  )
}


export const SettingCheckbox: React.FC<CheckboxProps> = ({ children, id, ...otherProps }) => {
  const { colorMode } = useColorMode()

  return (
    <Flex width="100%" alignItems="center" justify="space-between">
      <FormLabel
        htmlFor={id}
        margin="0"
        fontSize="16px"
        fontWeight="400"
        lineHeight="24px"
        color={colorMode === "dark" ? "neutral.20" : "neutral.80"}
      >{children}</FormLabel>
      <Checkbox id={id} {...otherProps} />
    </Flex>
  );
}

export const SettingBlock: React.FC<StackProps> = (props) => {
  const { colorMode } = useColorMode()
  return (
    <VStack
  spacing={4}
      pt={6}
      pb={2}
  alignItems="flex-start"
  borderTopWidth="1px"
  borderStyle="solid"
      borderColor={colorMode === "dark" ? "#343839" : "neutral.20"}
  {...props}
    />
  )
}