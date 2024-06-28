import {
    Box,
    Button,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useDeleteUnusedVectorAdminMutation } from "src/api/mutations/adminIndex";

function DeleteUnusedVectors() {
    const textColor = useColorModeValue("neutral.60", "neutral.40");

    const { mutateAsync: deleteUnusedVector, isLoading } = useDeleteUnusedVectorAdminMutation();

    async function handleDeleteVectors() {
        await deleteUnusedVector();
    }

    return (
        <Box marginTop="16px">
            <Text color={textColor} fontWeight="500">
                Delete Unused Vector
            </Text>
            <Button
                marginTop="4px"
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={handleDeleteVectors}
            >
                Delete Vectors
            </Button>
        </Box>
    );
}

export default DeleteUnusedVectors;
