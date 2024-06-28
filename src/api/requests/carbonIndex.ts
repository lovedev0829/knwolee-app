import { OnSuccessData } from "carbon-connect";
import { ServerResponse, apiRequest } from "./client";
import { TokenResponse } from "carbon-typescript-sdk";

export async function getCarbonAIAccessToken(token: string) {
  const res = await apiRequest<ServerResponse<TokenResponse>>(
    "GET",
    `carbon-ai/auth/access_token`,
    token
  );
  return res?.data?.result;
}

export const handleCarbonSuccessEvent = async (
  token: string,
  data: OnSuccessData
) => {
  const res = await apiRequest<ServerResponse<unknown>>(
    "POST",
    "carbon-ai/handle-success-event",
    token,
    data
  );
  return res.data?.result;
};
