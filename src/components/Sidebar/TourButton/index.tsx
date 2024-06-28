import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import AroundTheGlobeIcon from "src/Icons/AroundTheGlobeIcon";
import WelcomeTourModal from "src/components/Modal/WelcomeTourModal/WelcomeTourModal";

interface Props {
    collapsed?: boolean;
}

function TourButton({ collapsed = false }: Props) {
    const borderColor = collapsed ? "transparent" : "neutral.70";
    const buttonPadding = collapsed ? "0" : "12px 24px";

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                alignItems="center"
                border="2px solid"
                borderColor={borderColor}
                borderRadius="10px"
                display="flex"
                gap="8px"
                minHeight="48px"
                onClick={onOpen}
                padding={buttonPadding}
                variant="unstyled"
                width="full"
            >
                <Box flexShrink={0} height="25px" width="25px">
                    <AroundTheGlobeIcon />
                </Box>
                <Text color="neutral.10" fontWeight="500" hidden={collapsed}>
                    Get started!
                </Text>
            </Button>
            <WelcomeTourModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default TourButton;
