import { IInsight, Kpi } from "src/types/insightCreation.interface";
import { ServerResponse, apiRequest } from "./client";

export type GenerateInsightPayload = {
    kpi: Kpi;
};

export type ImproveInsightPayload = {
    action: string,
    createdInsightId: string,
};

export async function generateInsightRequest(
    token: string,
    payload: GenerateInsightPayload
) {
    const res = await apiRequest<ServerResponse<IInsight[]>>(
        "POST",
        `insight-generator/insight`,
        token,
        payload
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function getCreatedInsightsRequest(
    token: string,
    kpiId?: string
) {
    const res = await apiRequest<ServerResponse<IInsight[]>>(
        "GET",
        `insight-creation/insight`,
        token,
        null,
        {
            params: {
                kpiId: kpiId,
            },
        }
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function improveInsightRequest(
    token: string,
    payload: ImproveInsightPayload
) {
    const res = await apiRequest<ServerResponse<IInsight>>(
        "POST",
        `insight-generator/insight/improve-insight`,
        token,
        payload
    );
    if (!res.data.success) return null;
    return res.data.result;
}
