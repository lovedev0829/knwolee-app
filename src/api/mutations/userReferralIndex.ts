import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { sendUserReferralEmail } from "../requests/userReferralIndex";
import { SendUserReferralPayload } from "src/types/userReferral.interface";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";

export const useSendUserReferralEmailMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: SendUserReferralPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return sendUserReferralEmail(token, payload)
        },
        {
            onSuccess: () => {
                // Show success toast
                toast({
                    title: "Invite friend email sent",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error: AxiosError<ServerResponse<unknown>>) => {
                const errorMessage = error?.response?.data?.message;
                if (errorMessage) {
                    toast({
                        title: "An error occurred.",
                        description: errorMessage,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            },

        }
    );
};
