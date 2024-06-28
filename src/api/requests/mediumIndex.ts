

import { MediumConfig } from "src/types/medium.interface";
import { ServerResponse, apiRequest } from "./client";

export async function getMediumConfigRequest(token: string) {
    const res = await apiRequest<ServerResponse<MediumConfig>>(
        "GET",
        "medium/config",
        token
    );
    return res.data.result;
}

export async function mediumLoginRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/medium/auth/login`,
        token,
    );
    return res.data.result;
}

export async function addMediumAccessTokenRequest(
    token: string,
    payload: {accessToken: string | undefined}
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        `third-party/medium/add-access-token`,
        token,
        payload
    );
    return res.data.result;
}
