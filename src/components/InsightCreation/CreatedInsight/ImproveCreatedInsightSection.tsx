import { Box, Button, Stack, Text } from "@chakra-ui/react";
import UploadIcon from "src/Icons/UploadIcon";

// same action must be defined in backend as well
const improvementList = [
    {
        buttonText: "Make Shorter",
        action: "MAKE_SHORTER",
        leftIcon: <UploadIcon />,
    },
    {
        buttonText: "Expand",
        action: "EXPAND",
        leftIcon: <UploadIcon />,
    },
    {
        buttonText: "Improve",
        action: "IMPROVE",
        leftIcon: <UploadIcon />,
    },
    {
        buttonText: "Rephrase",
        action: "REPHRASE",
        leftIcon: <UploadIcon />,
    },
    {
        buttonText: "Add Emojis",
        action: "ADD_EMOJIS",
        leftIcon: <UploadIcon />,
    },
];

interface Props {
    handleImproveInsight: (action: string) => void;
    isLoading: boolean;
    loadingAction?: string;
}

function ImproveCreatedInsightSection({
    handleImproveInsight,
    isLoading,
    loadingAction,
}: Props) {
    return (
        <Box mt={12}>
            <Text fontWeight="500" color="neutral.60">
                Improve your insight with Knowlee:
            </Text>
            <Stack mt="11px" gap="11px">
                {improvementList.map((improvement) => {
                    return (
                        <Button
                            bg="primary.50"
                            color="neutral.10"
                            display="flex"
                            fontWeight="500"
                            leftIcon={improvement.leftIcon}
                            onClick={() => handleImproveInsight(improvement.action)}
                            padding="8px 16px"
                            variant="unstyled"
                            width="fit-content"
                            isDisabled={isLoading}
                            isLoading={isLoading && loadingAction === improvement.action}
                            _hover={{}}
                        >
                            {improvement.buttonText}
                        </Button>
                    );
                })}
            </Stack>
        </Box>
    );
}

export default ImproveCreatedInsightSection;
