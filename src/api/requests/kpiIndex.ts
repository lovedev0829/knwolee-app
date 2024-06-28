import {
    InsightFormat,
    IKpi,
    Kpi,
    ArtemisInsight,
} from "src/types/insightCreation.interface";
import { ServerResponse, apiRequest } from "./client";

export type GenerateKpiPayload = {
    kpi?: string;
    formats?: InsightFormat[];
};

export type GetArtemisInsightPayload = {
    formats: string[];
};

export async function generateKpiRequest(
    token: string,
    payload?: GenerateKpiPayload
) {
    const res = await apiRequest<ServerResponse<Kpi[]>>(
        "POST",
        `insight-creation/kpi`,
        token,
        payload,
        {
            params: {
                formats: payload?.formats,
            },
        }
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function getKpisRequest(token: string) {
    const res = await apiRequest<ServerResponse<IKpi[]>>(
        "GET",
        `insight-creation/kpi`,
        token
    );
    if (!res.data.success) return null;
    return res.data.result;
}

export async function getArtemisInsightRequest(
    token: string,
    payload: GetArtemisInsightPayload
) {
    const res = await apiRequest<ServerResponse<{ insights: ArtemisInsight[] }>>(
        "GET",
        `insight-creation/artemis-insight`,
        token,
        null,
        {
            params: {
                formats: payload.formats,
            },
        }
    );
    return res.data.result;
}
