import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";
import {
    addOpenAIAPIKeyRequest,
    discordLoginRequest,
    exportUrlPayload,
    googleExportUrlContentRequest,
    googleLoginRequest,
    linkedInLoginRequest,
    microsoftLoginRequest,
    tiktokLoginRequest,
    notionLoginRequest,
    trelloLoginRequest,
} from "../requests/thirdPartyIndex";

export const useGoogleLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return googleLoginRequest(token);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useGoogleExportUrlContentMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: exportUrlPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return googleExportUrlContentRequest(token, payload);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useMicrosoftLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return microsoftLoginRequest(token);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useLinkedInLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return linkedInLoginRequest(token);
        },
        {
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useTrelloLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return trelloLoginRequest(token);
        },
        {
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useNotionLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return notionLoginRequest(token);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useTiktokLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return tiktokLoginRequest(token);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useDiscordLoginMutation = () => {
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return discordLoginRequest(token);
        },
        {
            onSuccess: () => {
                // console.log("success");
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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

export const useAddOpenAIAPIKeyMutation = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: { apiKey: string }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return addOpenAIAPIKeyRequest(token, payload);
        },
        {
            onSuccess: async () => {
                toast({
                    title: "OpenAI API Key Added Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                await queryClient.invalidateQueries(["third-party/config"]);
            },
            onError: (error) => {
                const responseErrorMessage = (
                    error as AxiosError<ServerResponse<unknown>>
                )?.response?.data?.message;
                if (responseErrorMessage && typeof responseErrorMessage === "string") {
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
