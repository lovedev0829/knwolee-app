import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import {
    getDefaultProcessesRequest,
    getMessagesOfUserProcessThreadRequest,
    getRunsOfUserProcessThreadRequest,
    getUserProcessesRequest,
    retrieveUserProcessRequest,
} from "../requests/knowleeProcessIndex";

export function useUserProcesses() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-process", "user-processes"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getUserProcessesRequest(token);
        }
    );
}

export function useRetrieveUserProcess(processId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-process", "user-process", processId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return retrieveUserProcessRequest(token, processId);
        }
    );
}

export function useDefaultProcesses() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["knowlee-process/default-processes"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getDefaultProcessesRequest(token);
    });
}

export function useUserProcessThreadMessages(threadId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        [`knowlee-process/user-process/threads/${threadId}/messages`],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getMessagesOfUserProcessThreadRequest(token, threadId);
        },
        {
            enabled: Boolean(threadId),
        }
    );
}

export function useUserProcessThreadRuns(threadId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        [`knowlee-process/user-process/threads/${threadId}/runs`],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getRunsOfUserProcessThreadRequest(token, threadId);
        },
        {
            enabled: Boolean(threadId),
        }
    );
}
