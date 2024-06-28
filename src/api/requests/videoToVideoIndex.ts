import { GenerateVideoClipPayload } from "src/types/videoCreation.interface";
import { ServerResponse, apiRequest } from "./client";
import { KlapExportedClip, KlapVideo } from "src/types/klap.interface";

export async function generateVideoRequest(
    token: string,
    payload: GenerateVideoClipPayload
) {
    const res = await apiRequest<ServerResponse<
        {
            klapExportedClip: KlapExportedClip;
        }
    >>(
        "POST",
        `video-to-video/generate-clip`,
        token,
        payload
    );
    return res.data.result;
}

export async function getKlapVideoRequest(token: string, params?: unknown) {
    const res = await apiRequest<ServerResponse<KlapVideo[]>>(
        "GET",
        `video-to-video/klap-video`,
        token,
        null,
        {
            params: params,
        }
    );
    return res.data.result;
}

export async function getKlapExportedClipRequest(token: string, params?: unknown) {
    const res = await apiRequest<ServerResponse<KlapExportedClip[]>>(
        "GET",
        `video-to-video/klap-exported-clip`,
        token,
        null,
        {
            params: params,
        }
    );
    return res.data.result;
}
