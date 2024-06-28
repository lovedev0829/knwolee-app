import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteSourceAdminMutation } from "src/api/mutations/adminIndex";

function DeleteSource() {
    const textColor = useColorModeValue("neutral.60", "neutral.40");
    const borderColor = useColorModeValue("neutral.30", "neutral.80");

    const [userId, setUserId] = useState("");
    const [entityId, setEntityId] = useState("");

    const { mutateAsync, isLoading } = useDeleteSourceAdminMutation();

    async function handleDeleteUser() {
        await mutateAsync({ userId, entityId });
        setUserId("");
    }

    return (
        <Box marginTop="16px">
            <FormControl>
                <FormLabel color={textColor} fontWeight="500">
                    Delete Source
                </FormLabel>
                <Input
                    borderRadius="12px"
                    maxWidth={["100%", "100%", "560px"]}
                    border="2px solid"
                    borderColor={borderColor}
                    padding={"8px"}
                    // focusBorderColor="transparent"
                    placeholder="Enter a valid UserId. Example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'."
                    value={userId}
                    onChange={(e) => {
                        setUserId(e.target.value);
                    }}
                    name="userId"
                    required={true}
                />
            </FormControl>
            <FormControl marginTop="8px">
                <Input
                    borderRadius="12px"
                    maxWidth={["100%", "100%", "560px"]}
                    border="2px solid"
                    borderColor={borderColor}
                    padding={"8px"}
                    // focusBorderColor="transparent"
                    placeholder="Enter a valid EntityId. Example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'."
                    value={entityId}
                    onChange={(e) => {
                        setEntityId(e.target.value);
                    }}
                    name="entityId"
                    required={true}
                />
            </FormControl>
            <Button
                marginTop="8px"
                isDisabled={!userId || !entityId || isLoading}
                isLoading={isLoading}
                onClick={handleDeleteUser}
            >
                Delete Source
            </Button>
        </Box>
    );
}

export default DeleteSource;
