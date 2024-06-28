import {
    OpenAIFunctionWithGrouping,
    OpenAIFunction,
} from "src/types/openAI.interface";
import { ServerResponse, apiRequest } from "./client";
import { DefaultAgent, UserAgent, UserAgentWithFunctionDefinition } from "src/types/userAgent.interface";
import {
    Run,
} from "openai/resources/beta/threads/runs/runs";
import { Assistant, AssistantDeleted, AssistantsPage } from "openai/resources/beta/index.mjs";

export type CreateKnowleeAgentPayload = {
    avatar: object,
    name: string;
    instructions: string;
    entityIds: string[];
    functionDefinitions: string[];
    functionTypes: string[];
    openai_model: string;
    initialPrompts: string[];
};

export type UpdateAssistantPayload = {
    id: string;
} & Partial<CreateKnowleeAgentPayload>

export async function createKnowleeAgentRequest(
    token: string,
    payload?: CreateKnowleeAgentPayload
) {
    const res = await apiRequest<ServerResponse<{ userAgent: UserAgent }>>(
        "POST",
        `knowlee-agent`,
        token,
        payload
    );
    return res.data.result;
}

export async function getAllAgentsRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ body: AssistantsPage }>>(
        "GET",
        `knowlee-agent/assistants`,
        token,
    );
    return res.data.result?.body;
}

export async function retrieveAssistantRequest(
    token: string,
    assistantId: string,
) {
    const res = await apiRequest<ServerResponse<UserAgent>>(
        "GET",
        `knowlee-agent/assistants/${assistantId}`,
        token,
    );
    return res.data.result;
}

export async function updateAssistantRequest(
    token: string,
    payload: UpdateAssistantPayload,
) {
    const res = await apiRequest<ServerResponse<Assistant>>(
        "POST",
        `knowlee-agent/assistants/${payload.id}`,
        token,
        payload
    );
    return res.data.result;
}

export async function getUserAgentsRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<UserAgentWithFunctionDefinition[]>>(
        "GET",
        `knowlee-agent/user-agents`,
        token,
    );
    return res.data.result;
}

export async function getFilteredUserAgentsRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<UserAgentWithFunctionDefinition[]>>(
        "GET",
        `knowlee-agent/filtered-user-agents`,
        token,
    );
    return res.data.result;
}

export async function getDefaultAgentsRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<DefaultAgent[]>>(
        "GET",
        `knowlee-agent/default-agents`,
        token,
    );
    return res.data.result;
}

export async function addDefaultAgentAsUserAgentRequest(
    token: string,
    agentId: string,
) {
    const res = await apiRequest<ServerResponse<UserAgent[]>>(
        "POST",
        `/knowlee-agent/default-agents/user-agent`,
        token, 
        { agentId }
    );
    return res.data.result;
}

export async function deleteAssistantRequest(
    token: string,
    assistantId: string,
) {
    const res = await apiRequest<ServerResponse<AssistantDeleted>>(
        "DELETE",
        `knowlee-agent/assistants/${assistantId}`,
        token,
    );
    return res.data.result;
}

export async function shareAssistantRequest(
    token: string,
    assistantId: string,
    userId: string
) {
    
    const res = await apiRequest<ServerResponse<string>>(
        "POST",
        `knowlee-agent/share`,
        token,
        {
            assistantId,
            userId
        }
    );
    return res.data.result;
}

export async function acceptAssistantRequest(
    token: string,
    assistantToken: string,
    userId: string
) {
    
    const res = await apiRequest<ServerResponse<string>>(
        "GET",
        `knowlee-agent/share?token=${assistantToken}&newUserId=${userId}`,
        token,
    );
    return res.data.result;
}

export async function getThreadRunsRequest(
    token: string,
    threadId: string,
    params?: unknown,
) {
    const res = await apiRequest<
        ServerResponse<Run[]>
    >("GET", `knowlee-agent/user-threads/${threadId}/runs`, token, null, {
        params,
    });
    return res.data.result;
}

export async function getFunctionDefinitionsRequest(
    token: string,
    params?: unknown
) {
    const res = await apiRequest<ServerResponse<OpenAIFunction[]>>(
        "GET",
        `knowlee-agent/function-definitions`,
        token,
        null,
        {
            params,
        }
    );
    return res.data.result;
}

export async function getFunctionDefinitionsTypesRequest(
    token: string,
    params?: unknown
) {
    const res = await apiRequest<ServerResponse<OpenAIFunctionWithGrouping[]>>(
        "GET",
        `knowlee-agent/function-definitions-with-grouping`,
        token,
        null,
        {
            params,
        }
    );
    return res.data.result;
}

export async function openAICancelRunRequest(
    token: string,
    { userThreadId }: { userThreadId: string }
) {
    const res = await apiRequest<ServerResponse<Run>>(
        "POST",
        `knowlee-agent/threads/${userThreadId}/runs/cancel`,
        token
    );
    return res.data.result;
}
