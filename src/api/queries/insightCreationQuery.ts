import { useAuth0 } from "@auth0/auth0-react";
import { getKpisRequest } from "../requests/kpiIndex";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IInsight, IKpi } from "src/types/insightCreation.interface";
import { getCreatedInsightsRequest } from "../requests/insightIndex";

export function useMyKpis() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<IKpi[] | null, AxiosError>(
        ["insight-creation", "kpi"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getKpisRequest(token);
        }
    );
}

export function useCreatedInsights(kpiId?: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<IInsight[] | null, AxiosError>(
        ["insight-creation", "insight", kpiId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getCreatedInsightsRequest(token, kpiId);
        }
    );
}
