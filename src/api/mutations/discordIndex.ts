import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";
import { addDiscordAccessTokenRequest, discordLoginRequest } from "../requests/discordIndex";

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
        }, {
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

export const useDiscordAddAccessTokenMutation = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: {accessToken: string | undefined, serverId: string | undefined}) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return addDiscordAccessTokenRequest(token, payload);
        }, {
        onSuccess: async () => {
            // console.log("success");
            toast({
                title: "Token Added Successfully",
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