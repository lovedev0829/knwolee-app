import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { SpeechToTextResponse, getAudioTranscriptionResponse, getSpeechToSpeechResponse } from "src/utils";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";
import { playAudioFromBuffer } from "src/utils/audio";
import { TextToSpeechPayload, getTextToSpeechResponse } from "../requests/openaiIndex";

export const useOpenAIAudioTranscriptionMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast()

    return useMutation(
        async (payload: FormData) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getAudioTranscriptionResponse(token, payload)
        },
        {
            onSuccess: (data) => {
                console.log("Audio transciption successful", data);
            },
            onError: (error: AxiosError<ServerResponse<SpeechToTextResponse>>) => {
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

export const useOpenAISpeechToSpeechMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast()

    return useMutation(
        async (payload: FormData) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getSpeechToSpeechResponse(token, payload)
        },
        {
            onSuccess: (data) => {
                playAudioFromBuffer(data)
                ////console.log("Speech to speech successful", data);
            },
            onError: (error: AxiosError<ServerResponse<SpeechToTextResponse>>) => {
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

export const useOpenAITextToSpeechMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast()

    return useMutation(
        async (payload: TextToSpeechPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getTextToSpeechResponse(token, payload)
        },
        {
            onSuccess: (data) => {
                // playAudioFromBuffer(data)
                console.log("Text to speech successful", data);
            },
            onError: (error: AxiosError<ServerResponse<SpeechToTextResponse>>) => {
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