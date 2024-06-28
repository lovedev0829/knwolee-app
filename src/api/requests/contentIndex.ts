import { IContent, Topic } from "src/types/contentCreation.interface";
import { ServerResponse, apiRequest } from "./client";

export type GenerateContentPayload = {
    topic: Topic;
};

export type ImproveContentPayload = {
    action: string,
    createdContentId: string,
};

export type ScheduleContentPayload = {
    id: string; // Unique identifier for the content item
    scheduledAt: Date; // ISO date string for when the content is scheduled
    // Include other fields as necessary, depending on what else might be updated
};

export async function generateContentRequest(
    token: string,
    payload: GenerateContentPayload
) {
    const res = await apiRequest<ServerResponse<IContent[]>>(
        "POST",
        `content-creation/content`,
        token,
        payload
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function getCreatedContentsRequest(
    token: string,
    topicId?: string
) {
    const res = await apiRequest<ServerResponse<IContent[]>>(
        "GET",
        `content-creation/content`,
        token,
        null,
        {
            params: {
                topicId: topicId,
            },
        }
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function improveContentRequest(
    token: string,
    payload: ImproveContentPayload
) {
    const res = await apiRequest<ServerResponse<IContent>>(
        "POST",
        `content-creation/content/improve-content`,
        token,
        payload
    );
    if (!res.data.success) return null;
    return res.data.result;
}

// Add the updateContent function
export async function scheduleContentRequest(
    token: string,
    payload: ScheduleContentPayload
) {
    const res = await apiRequest<ServerResponse<IContent>>(
        "POST", 
        `content-creation/content/${payload.id}/schedule-content`, 
        token,
        payload
    );
    return res.data;
}
