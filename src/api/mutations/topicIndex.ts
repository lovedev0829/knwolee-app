import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { GenerateTopicPayload, generateTopicRequest } from "../requests/topicIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";

export const useGenerateTopicMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload?: GenerateTopicPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return generateTopicRequest(token, payload);
        }, {
        onSuccess: () => {
            ////console.log("success");
        },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage) {
                    toast({
                        title: "An error occurred.",
                        description: responseErrorMessage,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            },
    }
    );
};