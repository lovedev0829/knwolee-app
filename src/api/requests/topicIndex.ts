import { ContentFormat, ITopic, Topic } from "src/types/contentCreation.interface";
import { ServerResponse, apiRequest } from "./client";

export type GenerateTopicPayload = {
    topic?: string;
    formats?: ContentFormat[];
};

export async function generateTopicRequest(
    token: string,
    payload?: GenerateTopicPayload
) {
    const res = await apiRequest<ServerResponse<Topic[]>>(
        "POST",
        `content-creation/topic`,
        token,
        payload
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function getTopicsRequest(token: string) {
    const res = await apiRequest<ServerResponse<ITopic[]>>(
        "GET",
        `content-creation/topic`,
        token
    );
    if (!res.data.success) return null;
    return res.data.result;
}
