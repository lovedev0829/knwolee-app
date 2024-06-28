import { BoxProps } from "@chakra-ui/layout";
import { Icon, Badge, Input, InputGroup, InputProps, InputRightElement, useColorMode, Grid, GridItem } from "@chakra-ui/react";

import {
  Box,
  MenuList as ChakraMenuList,
  Menu,
  MenuItem,
} from "@chakra-ui/react";
import { styled } from "styled-components";
import { InputSelectButton } from "../Buttons";
import { useRef } from "react";

const MenuList = styled(ChakraMenuList)({
  position: "relative",
  zIndex: 9999,
});

interface StyledInputProps extends InputProps {
  rightIcon?: React.ReactElement<BoxProps>;
  subSetType: string;
  customZIndex: number;
  subSetTypes: {
    value: string;
    label: string;
    badge?: string;
    disabled?: boolean;
    colorScheme?: string;
  }[];
  onSelectTypeClick: (sourceType: string) => void;
  onDeleteEntity: () => void;
  placeholder: string;
  placeholderURL: string;
}

export default function StyledInput({
  rightIcon,
  onSelectTypeClick,
  onDeleteEntity,
  subSetType,
  customZIndex,
  subSetTypes,
  placeholder,
  placeholderURL,
  ...props
}: StyledInputProps) {
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputGroup
        as={Box}
        borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
        borderRadius="10px"
        bg={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
        boxSizing="border-box"
        zIndex={customZIndex * 1000}
        mt="12px"
        display="flex"
        justifyContent="space-between"
        gap="0px"
      >
      <Grid templateColumns='repeat(24, 1fr)' w="100%" templateRows={{  xl: "1fr", lg: "1fr", md: "1fr", sm: "repeat(2, 1fr)", base: "repeat(2, 1fr)"}} rowGap="6px">
        <GridItem colSpan={{ xl: 4, lg: 4, md: 4, sm: 24, base: 24 }}>
        <Menu>
          <InputSelectButton w="100%" minW="unset" subSetType={subSetType} />
          <MenuList>
          {subSetTypes.map(({ label, value, badge, disabled, colorScheme }) => (
          <MenuItem
            key={value}
            onClick={() => {
              onSelectTypeClick(value);
              inputRef.current?.focus();
            }}
            color={colorMode === "dark" ? "neutral.50" : "neutral.90"}
            isDisabled={disabled}
          >
            {label}
            {badge && (
              <Badge ml="2" colorScheme={colorScheme}>
                {badge}
              </Badge>
            )}
          </MenuItem>
        ))}
      </MenuList>
        </Menu>
        </GridItem>
        {!subSetType ? 
        <GridItem colSpan={{  xl: 20, lg: 20, md: 20, sm: 24, base: 24 }}>
          <Input width="100%" padding="12px" disabled value="Select source type" />   
        </GridItem>
        : 
        <>
        {placeholderURL &&
          <GridItem colSpan={{  xl: 10, lg: 11, md: 11, sm: 16, base: 14 }}>
          <Input width="100%" padding="12px" disabled value={placeholderURL} />
          </GridItem>
        }
        
        <GridItem colSpan={ placeholderURL ? { xl: 10, lg: 9, md: 9, sm: 8, base: 10 } : {  xl: 20, lg: 20, md: 20, sm: 24, base: 24 }}>
        <Input
          title={subSetType ? (placeholder || "Input a valid URL") : "Select source type"}
          _placeholder={{ color: colorMode === "dark" ? "neutral.70" : "neutral.50" }}
          placeholder={subSetType ? (placeholder || "Input a valid URL") : "Select source type"}
          padding="12px 16px"
          fontSize="16px"
          fontWeight="500"
          lineHeight="24px"
          color={colorMode === "dark" ? "neutral.50" : "neutral.90"}
          bg={colorMode === "dark" ? "neutral.90" : "none"}
          border={0}
          disabled={!subSetType}
          _disabled={{ color: colorMode === "dark" ? "neutral.70" : "neutral.90" }}
          ref={inputRef}

          {...props}
          value={props.value}
        />
        </GridItem>
        </>
        }
      </Grid>
    
      {rightIcon &&<InputRightElement  borderRadius="10px" bg={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}>
       <Box role="button" onClick={() => onDeleteEntity()}>
          <Icon as={() => rightIcon} />
        </Box>
      </InputRightElement>}
      </InputGroup>
  );
}
