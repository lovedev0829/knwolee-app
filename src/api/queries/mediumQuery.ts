import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { getMediumConfigRequest } from "../requests/mediumIndex";

export function useMediumConfig() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["medium/config"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getMediumConfigRequest(token);
    });
}
