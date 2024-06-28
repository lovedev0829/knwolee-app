import { IEntityFilter } from "src/components/Sources/SourcesTable";
import { Entity, EntityPayload, UserKnowledge } from "../../utils/types";
import { ServerResponse, apiRequest } from "./client";

export type GetAllUserScrapedEntitiesParams = { limit?: number, skip?: number, excludeNoData?: boolean }

export const getUserKnowledge = async (userId: string, token: string): Promise<UserKnowledge | null>  => {
  const res = await apiRequest<ServerResponse<UserKnowledge>>('get', `userKnowledge/${userId}`, token);
  if (!res.data.success) return null
  return res.data.result
}

export const getAllUserEntities = async (userId: string, token: string, filter?: IEntityFilter) => {
  const res = await apiRequest<ServerResponse<[{ isLocal?: boolean } & Entity]>>('get', `entity/all/${userId}`, token, null, {
    params: filter,
  });
  if (!res.data.success) return null
  return res.data.result
}

export async function getAllUserScrapedEntities(
  userId: string,
  token: string,
  params?: GetAllUserScrapedEntitiesParams
) {
  const res = await apiRequest<
    ServerResponse<{ entityList: [{ isLocal?: boolean } & Entity]; totalCount: number }>
  >("get", `entity/all-scraped/${userId}`, token, null, { params });
  return res.data.result;
}

export const getUserSubEntities = async (userId: string, entityId: string, token: string): Promise<[Entity] | null>  => {
  const res = await apiRequest<ServerResponse<[Entity]>>('get', `sub-entity/${entityId}/${userId}`, token);
  if (!res.data.success) return null
  return res.data.result
}

export const addEntity = async (userId: string, entities: EntityPayload[], token: string): Promise<Entity | null>  => {
  const res = await apiRequest<ServerResponse<Entity>>('post', `entity/${userId}`, token, entities);
  if (!res.data.success) return null
  return res.data.result
}

export const removeEntity = async (userId: string, entityId: string, token: string ): Promise<Entity | null>  => {
  const res = await apiRequest<ServerResponse<Entity>>('delete', `entity/${userId}/${entityId}`, token);
  if (!res.data.success) return null
  return res.data.result
}

export const bulkUploadEntityRequest = async (token: string, payload: FormData) => {
  const res = await apiRequest<ServerResponse<UserKnowledge>>("post", "entity/bulk-upload", token, payload);
  if (!res.data.success) return null
  return res.data.result
};
