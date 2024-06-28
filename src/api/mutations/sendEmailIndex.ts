import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { SendEmailPayload } from "src/types/community.interface";
import { sendSupportEmail } from "../requests/sendEmailIndex";

export const useSendSupportEmailMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: SendEmailPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return sendSupportEmail(token, payload)
        },
        {
            onSuccess: () => {
                // Show success toast
                toast({
                    title: "Support email sent",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    );
};
