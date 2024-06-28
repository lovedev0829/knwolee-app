import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { getUserUsageStatsRequest } from "../requests/userUsageRequests";

export function useUserUsageStats() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  return useQuery(["user-usage"], async () => {
    const token = await getToken(
      getAccessTokenSilently,
      getAccessTokenWithPopup
    );
    if (!token) throw new Error("Failed to get token");
    return getUserUsageStatsRequest(token);
  });
}
