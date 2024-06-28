import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from ".";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStatsRequest } from "../requests/adminIndex";

export function useAdminDashboardStats() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["admin", "dashboard-stats"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getAdminDashboardStatsRequest(token);
    });
}
