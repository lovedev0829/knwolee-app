

import { TelegramConfig } from "src/types/telegram.interface";
import { ServerResponse, apiRequest } from "./client";

export async function getTelegramConfigRequest(token: string) {
    const res = await apiRequest<ServerResponse<TelegramConfig>>(
        "GET",
        "telegram/config",
        token
    );
    return res.data.result;
}

export async function telegramLoginRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/telegram/auth/login`,
        token,
    );
    return res.data.result;
}

export async function addTelegramAccessTokenRequest(
    token: string,
    payload: {accessToken: string | undefined, assistant_id: string | undefined}
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        `third-party/telegram/add-access-token`,
        token,
        payload
    );
    return res.data.result;
}
