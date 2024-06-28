import { ThirdPartyConfig } from "src/types/thirdParty.interface";
import { ServerResponse, apiRequest } from "./client";

export type exportUrlPayload = {
    docId: string, 
    docType: string
}

export async function getThirdPartyConfigRequest(token: string) {
    const res = await apiRequest<ServerResponse<ThirdPartyConfig>>(
        "GET",
        "third-party/config",
        token
    );
    return res.data.result;
}

export async function googleLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/google/auth/login`,
        token
    );
    return res.data.result;
}

export async function googleExportUrlContentRequest(token: string, payload: exportUrlPayload) {
    const res = await apiRequest<ServerResponse<{text: string}>>(
        "POST",
        `third-party/google/generate-export-url-content`,
        token,
        payload
    );
    return res.data.result;
}

export async function microsoftLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/microsoft/auth/login`,
        token
    );
    return res.data.result;
}

export async function linkedInLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/linkedin/auth/login`,
        token
    );
    return res.data.result;
}

export async function trelloLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/trello/auth/login`,
        token
    );
    return res.data.result;
}

export async function notionLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/notion/auth/login`,
        token
    );
    return res.data.result;
}

export async function tiktokLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/tiktok/auth/login`,
        token
    );
    return res.data.result;
}

export async function discordLoginRequest(token: string) {
    const res = await apiRequest<ServerResponse<{ authURL: string }>>(
        "POST",
        `third-party/discord/auth/login`,
        token
    );
    return res.data.result;
}

export async function addOpenAIAPIKeyRequest(
    token: string,
    payload: { apiKey: string }
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        `third-party/openai/api-key`,
        token,
        payload
    );
    return res.data.result;
}
