import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { getTelegramConfigRequest } from "../requests/telegramIndex";

export function useTelegramConfig() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["telegram/config"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getTelegramConfigRequest(token);
    });
}
