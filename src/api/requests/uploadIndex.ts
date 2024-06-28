import { ServerResponse, apiRequest } from "./client";

export const uploadPdfFile = async (payload: FormData, token: string): Promise<string | null> => {
  const res = await apiRequest<ServerResponse<string>>('post', `upload/pdf`, token, payload);

  if (!res.data.success) return null;

  return res.data.result;
};

export const uploadFileFTB = async (payload: FormData, token: string) => {
  const res = await apiRequest<ServerResponse<unknown>>('post', `upload/document`, token, payload);

  if (!res.data.success) return null;

  return res.data.result;
};

export const uploadImageForImageInterpretationRequest = async (token: string, payload: FormData) => {
  const res = await apiRequest<ServerResponse<string>>('post', `upload/image-interpretation`, token, payload);
  if (!res.data.success) return null;
  return res.data.result;
};
