import { ServerResponse, apiRequest } from "./client";
import { SendUserReferralPayload } from "src/types/userReferral.interface";

export type SentMessageInfo = unknown;

interface getUserReferralEmailResponse {
    totalInvites: number;
    signedUpInvites: number;
}

export const sendUserReferralEmail = async (token: string, payload: SendUserReferralPayload) => {
    const res = await apiRequest<ServerResponse<SentMessageInfo>>('post', `userReferral`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};

export const getUserReferralEmail = async (token: string) => {
    const res = await apiRequest<ServerResponse<getUserReferralEmailResponse>>('get', `userReferral`, token);
    if (!res.data.success) throw new Error("Failed to fetch user referral email");
    return res.data.result;
};