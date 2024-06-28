import { useAuth0 } from "@auth0/auth0-react";
import { getTopicsRequest } from "../requests/topicIndex";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IContent, ITopic } from "src/types/contentCreation.interface";
import { getCreatedContentsRequest } from "../requests/contentIndex";

export function useMyTopics() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<ITopic[] | null, AxiosError>(
        ["content-creation", "topic"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getTopicsRequest(token);
        }
    );
}

export function useCreatedContents(topicId?: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<IContent[] | null, AxiosError>(
        ["content-creation", "content", topicId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getCreatedContentsRequest(token, topicId);
        }
    );
}
