import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import type { MenuProps } from './types';

export const MenuItem: React.FC<MenuProps> = ({
  icon: LeftIcon,
  title,
  route,
  ...buttonProps
}) => {
  const { colorMode } = useColorMode()
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = useMemo(() => location.pathname.includes(route), [location, route]);
  const iconFillColor = useColorModeValue(undefined, isSelected ? "#FEFEFE" : "#B0B3B5");
  const textColor = useColorModeValue("neutral.60", isSelected ? "neutral.10" : "neutral.50");
  const buttonHover = useColorModeValue({ bg: "neutral.20" }, { bg: "neutral.70" });

  return (
    <Button
      onClick={() => navigate(route)}
      leftIcon={
        <LeftIcon
          fill={iconFillColor}
        />
      }
      colorScheme="blue"
      width={["full", "full", "140px", "212px"]}
      height="40px"
      justifyContent="flex-start"
      fontSize="13px"
      color={textColor}
      lineHeight="20px"
      fontWeight="500"
      alignItems="center"
      bg="transparent"
      borderRadius="48px"
      borderStyle="solid"
      borderColor={colorMode === "dark"
      ? { bg: "neutral.70" }
      : { bg: "neutral.20" }
    }
      borderWidth={isSelected ? "2px" : "0px"}
      _hover={buttonHover}
      _active={{
        bg: "transparent",
      }}
      {...buttonProps}
    >
      <Link to={route}>{title}</Link>
    </Button>
  );
}