
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import { Conversation } from "src/components/Conversation/Conversations";
import { AddMessagePayload, addMessageInUserAgentThreads, createUserAgentThread, deleteAgentThread, updateUserAgentThread } from "../requests/agentThreads";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";

export type INewThreadPayload = Partial<Conversation> & {
    assistantId: string;
}
export const useNewUserAgentThreadMutation = () => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  
    return useMutation(
        async (payload: INewThreadPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return createUserAgentThread(token, payload)
        }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["user-threads"])
        },
    }
    );
  };

export const useUpdateAgentThreadMutation = (threadId: string) => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (data: { title: string }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return updateUserAgentThread(token, threadId, data)
        }
        , {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["user-threads"])
            },
        }
    );
};

export const useDeleteAgentThreadMutation = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (threadId: string) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return deleteAgentThread(token, threadId);
        },
        {
            onSuccess: async () => {
                onSuccess();
                await queryClient.invalidateQueries(["user-threads"]);
            },
        }
    );
};

export const useSendMessageInAgentThreadMutation = (threadId?: string) => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: AddMessagePayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            
            if (!token) throw new Error("Failed to get token");
            return addMessageInUserAgentThreads(token, payload);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries([
                    "knowlee-agent",
                    "user-threads-message",
                    threadId || data?.userThread._id,
                ]);
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
