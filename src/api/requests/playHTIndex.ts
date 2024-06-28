import { ServerResponse, apiRequest } from "./client";
import { IPlayHTClonedVoice, IplayHTGetVoicesResponse } from "src/types/playHT.interface";

export const playHTGetVoicesAPI = async (token: string) => {
  const res = await apiRequest<ServerResponse<IplayHTGetVoicesResponse>>(
    "GET",
    "play-ht/getVoices",
    token
  );
  if (!res.data.success) return null;
  return res.data.result.voices;
};

export const playHTGetClonedVoicesAPI = async (token: string) => {
  const res = await apiRequest<ServerResponse<IPlayHTClonedVoice[]>>(
    "GET",
    "play-ht/cloned-voices",
    token
  );
  if (!res.data.success) return null;
  return res.data.result;
};

export const playHTCloneVoiceAPI = async (token: string, data: FormData) => {
  const res = await apiRequest<ServerResponse<IPlayHTClonedVoice>>(
    "POST",
    "play-ht/cloned-voices/instant",
    token,
    data,
  );
  if (!res.data.success) return null;
  return res.data.result;
};
