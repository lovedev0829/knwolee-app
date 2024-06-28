import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import {
    GenerateInsightPayload,
    ImproveInsightPayload,
    generateInsightRequest,
    improveInsightRequest,
} from "../requests/insightIndex";

export const useGenerateInsightMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(async (payload: GenerateInsightPayload) => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return generateInsightRequest(token, payload);
    });
};

export const useImproveCreatedInsightMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(async (payload: ImproveInsightPayload) => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return improveInsightRequest(token, payload);
    });
};
