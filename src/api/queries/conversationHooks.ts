import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query"
import { getToken } from "./index";
import { getConversationById, getConversations } from "../requests/conversationIndex";

export function useConversationData(conversationId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(['conversations', conversationId], async () => {
        if (!conversationId) throw new Error("Failed to get conversationId");
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getConversationById(token, conversationId)
    })
}

export function useGetConversationList() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(['conversations'], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getConversations(token)
    })
}