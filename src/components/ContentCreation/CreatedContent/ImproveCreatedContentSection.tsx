import { Box, Button, Stack, Text } from "@chakra-ui/react";
import CircularArrowsIcon from "src/Icons/improve-created-content/CircularArrowsIcon";
import ExpandIcon from "src/Icons/improve-created-content/ExpandIcon";
import FantasyIcon from "src/Icons/improve-created-content/FantasyIcon";
import JoyentIcon from "src/Icons/improve-created-content/JoyentIcon";
import MinusRoundedIcon from "src/Icons/improve-created-content/MinusRoundedIcon";
import ReduceHeightIcon from "src/Icons/improve-created-content/ReduceHeightIcon";

// same action must be defined in backend as well
const improvementList = [
    {
        buttonText: "Make Shorter",
        action: "MAKE_SHORTER",
        leftIcon: <ReduceHeightIcon />,
    },
    {
        buttonText: "Expand",
        action: "EXPAND",
        leftIcon: <ExpandIcon />,
    },
    {
        buttonText: "Improve",
        action: "IMPROVE",
        leftIcon: <FantasyIcon />,
    },
    {
        buttonText: "Rephrase",
        action: "REPHRASE",
        leftIcon: <CircularArrowsIcon />,
    },
    {
        buttonText: "Add Emojis",
        action: "ADD_EMOJIS",
        leftIcon: <JoyentIcon />,
    },
    {
        buttonText: "Remove Emojis",
        action: "REMOVE_EMOJIS",
        leftIcon: <MinusRoundedIcon />,
    },
];

interface Props {
    handleImproveContent: (action: string) => void;
    isLoading: boolean;
    loadingAction?: string;
}

function ImproveCreatedContentSection({
    handleImproveContent,
    isLoading,
    loadingAction,
}: Props) {
    return (
        <Box mt={12}>
            <Text fontWeight="500" color="neutral.60">
                Improve your content with Knowlee:
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
                            onClick={() => handleImproveContent(improvement.action)}
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

export default ImproveCreatedContentSection;
