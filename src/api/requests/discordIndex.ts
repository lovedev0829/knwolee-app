

import { MediumConfig } from "src/types/medium.interface";
import { ServerResponse, apiRequest } from "./client";

export async function getDiscordConfigRequest(token: string) {
    const res = await apiRequest<ServerResponse<MediumConfig>>(
        "GET",
        "discord/config",
        token
    );
    return res.data.result;
}

export async function discordLoginRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/discord/auth/login`,
        token,
    );
    return res.data.result;
}

export async function addDiscordAccessTokenRequest(
    token: string,
    payload: {accessToken: string | undefined, serverId: string | undefined}
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        `third-party/discord/add-access-token`,
        token,
        payload
    );
    return res.data.result;
}
