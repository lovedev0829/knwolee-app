import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";

const activeButtonStyle = {
  color: "white",
  bg: "#4386F4",
};

type TabButtonProps = {
  isActive: boolean;
} & ButtonProps;

export const TabButton: React.FC<TabButtonProps> = ({ isActive, children, onClick, ...props }) => {
  const inActiveButtonBG = useColorModeValue("neutral.20", "neutral.80");
  const hoverInActiveButtonBG = useColorModeValue("neutral.30", "neutral.70"); // Adjust these values as needed

  const inactiveButtonStyle = {
    color: "neutral.60",
    bg: inActiveButtonBG,
    // _hover: {
    //   bg: hoverInActiveButtonBG, // This will apply a different background color on hover for inactive buttons
    // },
  };

  return (
    <Button
      sx={inactiveButtonStyle}
      borderRadius="50px"
      padding="8px 20px"
      fontSize="16px"
      fontWeight={isActive ? '500': '400'}
      _hover={isActive ? {} : undefined}
      _active={activeButtonStyle}
      onClick={onClick}
      isActive={isActive}
      flexShrink={0}
      {...props}
    >
      {children}
    </Button>
  );
};
