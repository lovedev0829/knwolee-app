import { ServerResponse, apiRequest } from "./client";
import { IUserUsageStat } from "src/types/userUsage.interface";

export async function getUserUsageStatsRequest(token: string) {
  const res = await apiRequest<ServerResponse<IUserUsageStat>>(
    "GET",
    `user-usage`,
    token
  );
  if (!res.data.success) return null;
  return res.data.result;
}
