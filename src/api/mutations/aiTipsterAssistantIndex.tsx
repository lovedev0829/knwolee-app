import { CreateFixtureAgentPayload, createFixtureAgentRequest } from "../requests/aiTipsterAssistant";
import { useAuth0 } from "@auth0/auth0-react";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import { AddMessagePayload } from "../requests/agentThreads";
import { Conversation } from "src/components/Conversation/Conversations";

export const useCreateFixtureAgentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload?: CreateFixtureAgentPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) {
                throw new Error("Failed to get token");
            }
            return createFixtureAgentRequest(token, payload);
        },
        {
            onError: (error: AxiosError<ServerResponse<unknown>>) => {
                if (error.response) {
                    const { message } = error.response.data;
                    toast({
                        title: "An error occurred.",
                        description: message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            },
        }
    );
};
