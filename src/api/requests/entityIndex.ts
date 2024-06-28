import {
    Entity,
    EntityWithoutUserVectors,
    FilterEntityQuery,
} from "src/utils/types";
import { ServerResponse, apiRequest } from "./client";

export const getEntityScrapedDataRequest = async (
    token: string,
    entityId: string,
    params?: { limit?: number; skip?: number }
) => {
    const res = await apiRequest<ServerResponse<unknown>>(
        "GET",
        `entity/scraped-data/${entityId}`,
        token, 
        {},
        { params }
    );
    return res.data.result;
};

export const getSubEntities = async (
    token: string,
    entityId: string
) => {
    const res = await apiRequest<ServerResponse<Entity[]>>(
        "GET",
        `entity`,
        token, null, {
            params: {
                originId: entityId
            }
        }
    );
    return res.data.result;
};

export const findEntitiesRequest = async (token: string, params: FilterEntityQuery) => {
    const res = await apiRequest<ServerResponse<EntityWithoutUserVectors[]>>(
        "GET",
        `entity/find-entities`,
        token,
        null,
        {
            params: params,
        }
    );
    return res.data.result;
};

export const handleGoogleDriveTextRequest = async (
    token: string,
    data: unknown
) => {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        "entity/handle-google-drive-text",
        token,
        data
    );
    return res.data?.result;
};

export const handleOnedriveFileRequest = async (
    token: string,
    data: { itemId: string }
) => {
    const res = await apiRequest<ServerResponse<unknown>>(
        "POST",
        "entity/handle-onedrive-file",
        token,
        data
    );
    return res.data?.result;
};
