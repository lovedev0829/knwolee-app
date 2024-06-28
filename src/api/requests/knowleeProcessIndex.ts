import { IMessageList } from "src/utils/types";
import { ServerResponse, apiRequest } from "./client";
import { UserProcess } from "src/types/userProcess.interface";
import { Thread } from "openai/resources/beta/index.mjs";
import { Run } from "openai/resources/beta/threads/index.mjs";

export type CreateKnowleeProcessPayload = {
    name: string;
    goals: [{ goal: string; assistantId: string }];
    isRecurring?: boolean;
    scheduledAt?: string | Date;
    interval?: string;
    avatar?: object;
};

export type UpdateKnowleeProcessPayload = {
    id: string;
} & Partial<CreateKnowleeProcessPayload>;

export async function createKnowleeProcessRequest(
    token: string,
    payload?: CreateKnowleeProcessPayload
) {
    const res = await apiRequest<ServerResponse<{ userProcess: UserProcess }>>(
        "POST",
        `knowlee-process`,
        token,
        payload
    );
    return res.data.result;
}

export async function getAllProcessesRequest(token: string) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "GET",
        `knowlee-process/user-process`,
        token
    );
    return res.data.result;
}

export async function retrieveUserProcessRequest(
    token: string,
    processId: string
) {
    const res = await apiRequest<ServerResponse<UserProcess & {threads: Thread[]}>>(
        "GET",
        `knowlee-process/user-process/${processId}`,
        token
    );
    return res.data.result;
}

export async function updateUserProcessRequest(
    token: string,
    payload: UpdateKnowleeProcessPayload
) {
    const res = await apiRequest<ServerResponse<UserProcess>>(
        "POST",
        `knowlee-process/user-process/${payload.id}`,
        token,
        payload
    );
    return res.data.result;
}

export async function getUserProcessesRequest(token: string) {
    const res = await apiRequest<ServerResponse<UserProcess[]>>(
        "GET",
        `knowlee-process/user-processes`,
        token
    );
    return res.data.result;
}

export async function deleteUserProcessRequest(
    token: string,
    processId: string
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "DELETE",
        `knowlee-process/user-process/${processId}`,
        token
    );
    return res.data.result;
}

export async function manuallyRunUserProcessRequest(
    token: string,
    payload: { id: string }
) {
    const res = await apiRequest<ServerResponse<{threadId: string}>>(
        "POST",
        `knowlee-process/user-process/manual-run/${payload.id}`,
        token,
        payload
    );
    return res.data.result;
}

export async function getDefaultProcessesRequest(token: string) {
    const res = await apiRequest<ServerResponse<UserProcess[]>>(
        "GET",
        `knowlee-process/default-processes`,
        token
    );
    return res.data.result;
}

export const getMessagesOfUserProcessThreadRequest = async (
    token: string,
    threadId: string
) => {
    const res = await apiRequest<ServerResponse<IMessageList>>(
        "get",
        `knowlee-process/user-process/threads/${threadId}/messages`,
        token
    );
    if (!res.data.success) return null;
    return res.data.result.data;
};

export const getRunsOfUserProcessThreadRequest = async (
    token: string,
    threadId: string
) => {
    const res = await apiRequest<ServerResponse<Run[]>>(
        "get",
        `knowlee-process/user-process/threads/${threadId}/runs`,
        token
    );
    if (!res.data.success) return null;
    return res.data.result;
};

export async function addDefaultProcessRequest(
    token: string,
    processId: string,
) {
    const res = await apiRequest<ServerResponse<UserProcess>>(
        "POST",
        `knowlee-process/default-processes`,
        token, 
        { processId }
    );
    return res.data.result;
}
