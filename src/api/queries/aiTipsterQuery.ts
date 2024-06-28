import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { getFixtureUpcoming } from "../requests/aiTipsterIndex";
import { useQuery } from "@tanstack/react-query";


export function useFixtureUpcoming() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["football", "sportFixturesByDate"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getFixtureUpcoming(token);
        }
    );
}


