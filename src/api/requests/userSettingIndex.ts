import { ServerResponse, apiRequest } from "./client";
import { UserSetting } from "src/types";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const getUserSetting = async (
  userId: string,
  token: string
): Promise<UserSetting | null> => {
  const res = await apiRequest<ServerResponse<UserSetting>>(
    "get",
    `userSetting/${userId}`,
    token
  );

  if (!res.data.success) return null;

  return res.data.result;
};

export const updateUserSetting = async (
  setting: UserSetting,
  token: string
): Promise<UserSetting | null> => {
  const res = await apiRequest<ServerResponse<UserSetting>>(
    "post",
    `userSetting/${setting.user}`,
    token,
    setting,
  );

  if (!res.data.success) return null;

  return res.data.result;
};
