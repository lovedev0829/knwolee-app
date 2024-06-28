import { Conversation } from "src/components/Conversation/Conversations";
import { ServerResponse, apiRequest } from "./client";

export const getConversationById = async (token: string, conversationId: string): Promise<Conversation | null> => {
    const res = await apiRequest<ServerResponse<Conversation>>("get", `/conversation/${conversationId}`, token, null, {
        params: {
            populate: ["chatList"]
        }
    })
    if (!res.data.success) return null;
    return res.data.result;
};

export const getConversations = async (token: string): Promise<[Conversation] | null> => {
    const res = await apiRequest<ServerResponse<[Conversation]>>("get", "conversation", token, null, {
        params: {
            populate: ["chatList"]
        }
    })
    if (!res.data.success) return null;
    return res.data.result;
};

export const createNewConversation = async (token: string, payload: Partial<Conversation>)
    : Promise<Conversation | null> => {
    const res = await apiRequest<ServerResponse<Conversation>>('post', `conversation`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};

export const updateConversation = async (token: string, conversationId: string, payload: Partial<Conversation>)
    : Promise<Conversation | null> => {
    const res = await apiRequest<ServerResponse<Conversation>>('patch', `conversation/${conversationId}`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};

export const deleteConversation = async (token: string, conversationId: string)
    : Promise<Conversation | null> => {
    const res = await apiRequest<ServerResponse<Conversation>>('delete', `conversation/${conversationId}`, token);
    if (!res.data.success) return null;
    return res.data.result;
};