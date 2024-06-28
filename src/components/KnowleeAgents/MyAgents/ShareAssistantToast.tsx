import {
    Box,
    Text,
    Button,
    useToast,
    Stack
} from "@chakra-ui/react";

import { CheckCircleIcon, CopyIcon } from '@chakra-ui/icons'

function ShareAssistantToast(message: string) {
    const toast = useToast();

    async function copyToClipboard(message: string) {
        await navigator.clipboard.writeText(message);
        // Show success toast
        toast({
            title: "Copied successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }
    return (
        <Box color="white" p={3} bg="green.600" sx={{borderRadius:8, p:3}}>
            <Stack direction="row" gap={2} alignItems="center">
                <CheckCircleIcon/>
                <Text>Assistant link has been generated!</Text>
            </Stack>

            <Button onClick={() => copyToClipboard(message) } size="sm" mt={2} leftIcon={<CopyIcon />} colorScheme="solid">
                Click here to copy the link
            </Button>
        </Box>
    );
}

export default ShareAssistantToast;