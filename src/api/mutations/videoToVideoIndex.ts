import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { generateVideoRequest } from "../requests/videoToVideoIndex";
import { GenerateVideoClipPayload } from "src/types/videoCreation.interface";

export const useGenerateVideoMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: GenerateVideoClipPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return generateVideoRequest(token, payload);
        }, {
        onSuccess: () => {
            //console.log("success");
        },
    }
    );
};