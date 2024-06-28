
import { TwitterConfig } from "src/types/twitter.interface";
import { ServerResponse, apiRequest } from "./client";

export async function getTwitterConfigRequest(token: string) {
    const res = await apiRequest<ServerResponse<TwitterConfig>>(
        "GET",
        "twitter/config",
        token
    );
    return res.data.result;
}

export async function twitterLoginRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/twitter/auth/login`,
        token,
    );
    return res.data.result;
}
