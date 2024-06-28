import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Conversation } from "src/components/Conversation/Conversations";
import { getChatResponse } from "src/utils";
import { Message } from "src/utils/types";
import { getToken } from "../queries";
import { createNewConversation, deleteConversation, updateConversation } from "../requests/conversationIndex";
import { RegenerateResponsePayload, regenerateResponseAPI } from "../requests/queryIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";

export const useNewQueryMutation = (conversationId: string) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async ({ updatedMessages }: { updatedMessages: Message[] }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getChatResponse(updatedMessages, conversationId)
        }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['conversations', conversationId]);
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

export const useNewConversationMutation = () => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: Partial<Conversation>) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return createNewConversation(token, payload)
        }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["conversations"])
        },
    }
    );
};

export const useUpdateConversationMutation = (conversationId: string) => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (data: { title: string }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return updateConversation(token, conversationId, data)
        }
        , {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["conversations"])
            },
        }
    );
};

export const useDeleteConversationMutation = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (conversationId: string) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return deleteConversation(token, conversationId)
        }
        , {
            onSuccess: async () => {
                onSuccess()
                await queryClient.invalidateQueries(["conversations"])
            },
        }
    );
};

export const useUpdateQuestionMutation = (conversationId: string) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async ({ updatedMessages, queryQuestionId }: { updatedMessages: Message[], queryQuestionId: string }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getChatResponse(updatedMessages, conversationId, queryQuestionId)
        }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['conversations', conversationId]);
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

export const useRegenerateResponseMutation = (conversationId?: string) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (data: RegenerateResponsePayload) => {
            if (!conversationId || !data.queryQuestionId) return null;
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return regenerateResponseAPI(token, data);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["conversations", conversationId]);
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