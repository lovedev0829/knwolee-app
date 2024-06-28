import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../queries";
import {
    addDefaultAgentAsUserAgentRequest,
    CreateKnowleeAgentPayload,
    createKnowleeAgentRequest,
    deleteAssistantRequest,
    openAICancelRunRequest,
    updateAssistantRequest,
    UpdateAssistantPayload,
    shareAssistantRequest,
    acceptAssistantRequest
} from "../requests/knowleeAgentIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { useToast } from "@chakra-ui/react";
import { useUserScrapedData } from "src/api/queries";
import { useNavigate } from "react-router-dom";
import ShareAssistantToast from "src/components/KnowleeAgents/MyAgents/ShareAssistantToast";

export const useCreateKnowleeAgentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload?: CreateKnowleeAgentPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return createKnowleeAgentRequest(token, payload);
        },
        {
            onSuccess: () => {
                toast({
                    title: "Assistant Created",
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

export const useUpdateAssistantMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation(
        async (payload: UpdateAssistantPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return updateAssistantRequest(token, payload);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["knowlee-agent", "user-agents"]);
                queryClient.invalidateQueries(["knowlee-agent", "assistants", data.id]);
                toast({
                    title: "Assistant Updated",
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

export const useDeleteAssistantMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation(
        async (assistantId: string) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return deleteAssistantRequest(token, assistantId);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["knowlee-agent", "user-agents"]);
                await queryClient.invalidateQueries(["knowlee-agent", "default-agents", "user-agent"]);
                toast({
                    title: "Assistant Deleted",
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

export const useShareAssistantMutation = () => {

    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();
    return useMutation(
        async ({assistantId, userId} : { assistantId: string, userId: string }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            
            return shareAssistantRequest(token, assistantId, userId);
        },
        {
            onSuccess: (data) => {
                toast({
                    duration: 5000,
                    isClosable: true,
                    render: () => ShareAssistantToast(data)
                });
               
            },
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


export const useHandleAssistantMutation = () => {

    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();
    const navigate = useNavigate();

    return useMutation(
        async ({ assistantToken, userId } : {assistantToken: string, userId : string}) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            
            return acceptAssistantRequest(token, assistantToken, userId);
        },
        {
            onSuccess: (data) => {
                toast({
                    title: "You've got the shared Assistant",
                    status: "success",
                    duration: 1000,
                    description: data,
                    onCloseComplete: () => {
                        navigate("/knowlee-assistants/my-assistants");
                    },
                    isClosable: true,
                });
            },
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

export const useAddDefaultAgentToUserAgentMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();
    const queryClient = useQueryClient();
    const { data: userDataSources } = useUserScrapedData();    

    return useMutation(
        async (agentId: string) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            // if(!userDataSources) return toast({
            //     title: "Looks like you need to add a knowledge source first.",
            //     description: `Let's add one to create your first agent!            `,
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //   });
            return addDefaultAgentAsUserAgentRequest(token, agentId);
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["knowlee-agent", "user-agents"]);
                await queryClient.invalidateQueries(["knowlee-agent", "default-agents", "user-agent"]);
                toast({
                    title: "Assistant added successfully",
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

export const useCancelRunMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: { userThreadId: string; }) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");

            return openAICancelRunRequest(token, payload);
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
