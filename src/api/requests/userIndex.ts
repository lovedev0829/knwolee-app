import { ServerResponse, apiRequest } from "./client";
import { User } from "src/types";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const getUser = async (userAuth0Id: string, token: string): Promise<User | null> => {
  const res = await apiRequest<ServerResponse<User>>('get', `user/${userAuth0Id}`, token);

  if (!res.data.success) return null;

  return res.data.result;
};

export const updateProfile = async (payload: FormData,  token: string): Promise<User | null> => {
  const res = await apiRequest<ServerResponse<User>>('put', `user`, token, payload);

  if (!res.data.success) return null;

  return res.data.result;
}


export const deleteUserAccountRequest = async (
  token: string
) => {
  const res = await apiRequest<ServerResponse<unknown>>(
    "DELETE",
    `user/delete-account`,
    token
  );
  return res.data;
};
