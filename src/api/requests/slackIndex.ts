
import { ServerResponse, apiRequest } from "./client";

export async function slacLoginRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/slack/auth/login`,
        token,
    );
    return res.data.result;
}
