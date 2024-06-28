import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { playHTCloneVoiceAPI, playHTGetClonedVoicesAPI, playHTGetVoicesAPI } from "../requests/playHTIndex";
import { getToken } from "./index";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { IPlayHTClonedVoice } from "src/types/playHT.interface";

export function usePlayHTVoices() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["play-ht", "getVoices"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return playHTGetVoicesAPI(token);
    })
}

export function usePlayHTClonedVoices() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["play-ht", "cloned-voices"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return playHTGetClonedVoicesAPI(token);
    })
}

export function usePlayHTCloneVoiceMutation() {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useMutation(
        async (data: FormData) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return playHTCloneVoiceAPI(token, data);
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(["play-ht", "cloned-voices"]);
                toast({
                    title: "Voice cloned successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            },
            onError: (error: AxiosError<ServerResponse<IPlayHTClonedVoice>>) => {
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
}
