import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteUserAdminMutation } from "src/api/mutations/adminIndex";

function DeleteUser() {
    const textColor = useColorModeValue("neutral.60", "neutral.40");
    const borderColor = useColorModeValue("neutral.30", "neutral.80");

    const [userId, setUserId] = useState("");

    const { mutateAsync, isLoading } = useDeleteUserAdminMutation();

    async function handleDeleteUser() {
        await mutateAsync(userId);
        setUserId("");
    }

    return (
        <Box marginTop="12px">
            <FormControl>
                <FormLabel color={textColor} fontWeight="500">
                    Delete User
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
            <Button
                marginTop="8px"
                isLoading={isLoading}
                isDisabled={!userId || isLoading}
                onClick={handleDeleteUser}

            >
                Delete User
            </Button>
        </Box>
    );
}

export default DeleteUser;
