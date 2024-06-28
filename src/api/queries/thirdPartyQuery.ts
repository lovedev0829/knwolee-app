import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { getThirdPartyConfigRequest } from "../requests/thirdPartyIndex";

export function useThirdPartyConfig() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["third-party/config"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getThirdPartyConfigRequest(token);
    });
}
