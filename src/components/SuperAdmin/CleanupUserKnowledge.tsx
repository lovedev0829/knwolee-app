import {
    Box,
    Button,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useCleanupUserKnowledgeAdminMutation } from "src/api/mutations/adminIndex";

function CleanupUserKnowledge() {
    const textColor = useColorModeValue("neutral.60", "neutral.40");

    const { mutateAsync: cleanupUserKnowledge, isLoading } = useCleanupUserKnowledgeAdminMutation();

    async function handleDeleteVectors() {
        await cleanupUserKnowledge();
    }

    return (
        <Box marginTop="16px">
            <Text color={textColor} fontWeight="500">
                Cleanup User Knowledge
            </Text>
            <Button
                marginTop="4px"
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={handleDeleteVectors}
            >
                Cleanup
            </Button>
        </Box>
    );
}

export default CleanupUserKnowledge;
