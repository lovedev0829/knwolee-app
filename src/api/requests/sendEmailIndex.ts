import { SendEmailPayload } from "src/types/community.interface";
import { ServerResponse, apiRequest } from "./client";

export type SentMessageInfo = unknown;

export const sendSupportEmail = async (token: string, payload: SendEmailPayload) => {
    const res = await apiRequest<ServerResponse<SentMessageInfo>>('post', `send-email/support-email`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};