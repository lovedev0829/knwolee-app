import { ServerResponse, apiRequest } from "./requests/client";

interface UpsertPineconeVectorResponse {
    vectorId: string;
    upsertResponse: { upsertedCount?: number };
}

export interface UpsertPinconeVectorPayload {
    embedText: string
    metadata?: object
}

export const upsertPineconeVector = async (token: string, payload: UpsertPinconeVectorPayload)
    : Promise<UpsertPineconeVectorResponse | null> => {
    const res = await apiRequest<ServerResponse<UpsertPineconeVectorResponse>>('post', `pinecone/upsert`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};