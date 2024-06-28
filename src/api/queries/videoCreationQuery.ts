import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    getKlapExportedClipRequest,
    getKlapVideoRequest,
} from "../requests/videoToVideoIndex";
import { KlapExportedClip, KlapVideo } from "src/types/klap.interface";

export function useKlapVideos() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<KlapVideo[], AxiosError>(
        ["video-to-video", "klap-video"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getKlapVideoRequest(token);
        }
    );
}

export function useKlapExportedClips(params?: unknown) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<KlapExportedClip[], AxiosError>(
        ["video-to-video", "klap-exported-clip"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getKlapExportedClipRequest(token, params);
        }
    );
}
