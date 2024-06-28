import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from ".";
import {
    GetArtemisInsightPayload,
    getArtemisInsightRequest,
} from "../requests/kpiIndex";

export function useArtemisInsightsData(payload: GetArtemisInsightPayload) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["insight-creation", "artemis-insight", payload.formats], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getArtemisInsightRequest(token, payload);
    });
}
