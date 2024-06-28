import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

function ButtonOutline({ isComingSoon, tooltipLabel, ...buttonProps }: ButtonProps & { isComingSoon?: boolean, tooltipLabel?: string }) {
    const borderColor = useColorModeValue("neutral.30", "#343839");
    const color = useColorModeValue("neutral.90", "neutral.10");
    const bg = useColorModeValue("white", "#232627");

    const buttonStyle = isComingSoon
        ? {
            variant: "outline",
            border: "2px dashed",
            borderColor: "gray.500",
            color: "gray.500",
            _disabled: { opacity: 0.8, cursor: "not-allowed" },
            isDisabled: true,
          }
        : {
            display: "flex",
            padding: "12px 24px",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: "1px",
            border: "2px solid",
            borderColor,
            color,
            bg,
            fontSize: "16px",
            fontWeight: "500",
          };

    const button = <Button {...buttonStyle} {...buttonProps} />;
    return isComingSoon && tooltipLabel
        ? <Tooltip label={tooltipLabel} hasArrow placement="top">{button}</Tooltip>
        : button;
}

export default ButtonOutline;