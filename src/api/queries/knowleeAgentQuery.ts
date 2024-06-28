import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAllAgentsRequest,
    getDefaultAgentsRequest,
    getUserAgentsRequest,
    retrieveAssistantRequest,
    getThreadRunsRequest,
    getFunctionDefinitionsRequest,
    getFunctionDefinitionsTypesRequest,
    getFilteredUserAgentsRequest,
} from "../requests/knowleeAgentIndex";
import { getUserAgentThreads, getUserThread, getUserThreadStatus } from "../requests/agentThreads";

export function useAllAgents() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "assistants"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getAllAgentsRequest(token);
        }
    );
}

export function useThreadRuns(threadId: string, params?: unknown) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "user-threads", threadId, "runs"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getThreadRunsRequest(token, threadId, params);
        },
        {
            enabled: Boolean(threadId),
        }
    );
}

export function useUserAgents() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "user-agents"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getUserAgentsRequest(token);
        }
    );
}

export function useFilteredUserAgents() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "filtered-user-agents"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getFilteredUserAgentsRequest(token);
        }
    );
}

export function useDefaultAgents() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "default-agents", "user-agent"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getDefaultAgentsRequest(token);
        }
    );
}

export function useRetrieveAssistant(assistantId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "assistants", assistantId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return retrieveAssistantRequest(token, assistantId);
        }
    );
}


export function useGetUserAgentThreadsList() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(['user-threads'], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getUserAgentThreads(token)
    })
}

export function useGetRunStatus(
    threadId: string,
    runId: string,
    userThreadId?: string
) {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "user-threads", "run", threadId, runId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            const data = await getUserThreadStatus(token, threadId, runId);

            // invalidate thread runs API when there is usage object in run
            if (data?.usage) {
                queryClient.invalidateQueries([
                    "knowlee-agent",
                    "user-threads",
                    userThreadId,
                    "runs",
                ]);
                queryClient.invalidateQueries(["user-usage"]);
            }
            return data;
        },
        {
            refetchInterval: (data) => {
                if (["", "queued", "in_progress"].includes(data?.status || "")) {
                    return 2000;
                }
                return false;
            },
            enabled: Boolean(threadId && runId),
        }
    );
}

export function useGetAgentThread({
    threadId,
    enabled,
}: {
    threadId?: string;
    enabled?: boolean;
}) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "user-threads-message", threadId],
        async () => {
            if (!threadId) return [];
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getUserThread(token, threadId);
        },
        {
            enabled: enabled,
        }
    );
}

export function useAvailableFunctions(params?: unknown) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "function-definitions", params],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getFunctionDefinitionsRequest(token, params);
        },
    );
}

export function useAvailableFunctionsWithGrouping(params?: unknown) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["knowlee-agent", "function-definitions-with-grouping", params],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getFunctionDefinitionsTypesRequest(token, params);
        },
    );
}
