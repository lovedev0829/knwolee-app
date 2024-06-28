import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from ".";
import { useQuery } from "@tanstack/react-query";
import {
    findEntitiesRequest,
    getEntityScrapedDataRequest,
    getSubEntities,
} from "../requests/entityIndex";
import { AxiosError } from "axios";
import { FilterEntityQuery } from "src/utils/types";

export interface IPagination { limit?: number; skip?: number, total?: 0 }
export function useEntityScrapedData(entityId: string, params?: IPagination) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<unknown, AxiosError>(
        ["entity", "scraped-data", entityId, params],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getEntityScrapedDataRequest(token, entityId, params);
        }
    );
}

export function useGetSubEntities(entityId: string) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["sub-entities", entityId],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getSubEntities(token, entityId);
        }
    );
}

export function useFindEntities(
    params: FilterEntityQuery,
    { enabled }: { enabled: boolean }
) {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["entity", "find-entities", params],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return findEntitiesRequest(token, params);
        },
        {
            enabled: enabled,
        }
    );
}
