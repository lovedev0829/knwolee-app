import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import {
    GenerateContentPayload,
    ImproveContentPayload,
    ScheduleContentPayload,
    generateContentRequest,
    improveContentRequest,
    scheduleContentRequest,
} from "../requests/contentIndex";
import { useSearchParams } from "react-router-dom";
import { IContent } from "src/types/contentCreation.interface";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";

export const useGenerateContentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: GenerateContentPayload) => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return generateContentRequest(token, payload);
        },
        {
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

export const useImproveCreatedContentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const topicId = searchParams.get("topicId");
    const toast = useToast();

    return useMutation(
        async (payload: ImproveContentPayload) => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return improveContentRequest(token, payload);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "content-creation",
                    "content",
                    topicId,
                ]);
            },
            onError: (error: AxiosError<ServerResponse<IContent>>) => {
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

export const useScheduleContentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation(
        async (payload: ScheduleContentPayload) => {
            const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
            if (!token) throw new Error("Failed to get token");
            const res = await scheduleContentRequest(token, payload);
            const successMessage = res?.message;
            if(successMessage && typeof successMessage === "string"){
                toast({
                    title: successMessage,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
            return res?.result;
        },
        {
            onSuccess: () => {
                // Adjust this to match the queries you want to invalidate or refetch
                queryClient.invalidateQueries(["content"]);
            },
            onError: (error: AxiosError<ServerResponse<IContent>>) => {
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
