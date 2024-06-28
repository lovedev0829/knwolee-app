import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { getToken } from "../queries";
import { useMutation } from "@tanstack/react-query";
import {
    DeleteSourcePayload,
    cleanupUserKnowledgeAdminRequest,
    deleteSourceAdminRequest,
    deleteUnusedVectorAdminRequest,
    deleteUserAdminRequest,
} from "../requests/adminIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";

export const useDeleteUserAdminMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (userId: string) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return deleteUserAdminRequest(token, userId);
        },
        {
            onSuccess: () => {
                toast({
                    title: "User account deleted successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            },
            onError: (error: AxiosError<ServerResponse<unknown>>) => {
                if (error.response) {
                    const { message } = error.response.data;
                    toast({
                        title: "An error occurred.",
                        description: `Error: ${message}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            },
        }
    );
};

export const useDeleteSourceAdminMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: DeleteSourcePayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return deleteSourceAdminRequest(token, payload);
        },
        {
            onSuccess: (res) => {
                const successMessage = res?.message;
                if (successMessage) {
                    toast({
                        title: successMessage,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                }
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

export const useDeleteUnusedVectorAdminMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return deleteUnusedVectorAdminRequest(token);
        },
        {
            onSuccess: (res) => {
                const successMessage = res?.message;
                if (successMessage) {
                    toast({
                        title: successMessage,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                }
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

export const useCleanupUserKnowledgeAdminMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return cleanupUserKnowledgeAdminRequest(token);
        },
        {
            onSuccess: (res) => {
                const successMessage = res?.message;
                if (successMessage) {
                    toast({
                        title: successMessage,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                }
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
