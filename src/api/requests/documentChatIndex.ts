import { Message } from "../../utils/types";
import { ServerResponse, apiRequest } from "./client";


export const sendMessageWithPdfDocument = async (payload: FormData, token: string): Promise<string | null> => {
  const res = await apiRequest<ServerResponse<string>>('post', `documentChat/withDocument`, token, payload);

  if (!res.data.success) return null;

  return res.data.result;
};

export const getDocumentUserChatHistory = async (userId: string, token: string ) => {
  const res = await apiRequest<ServerResponse<Message[]>>('get', `documentChat/${userId}`, token)

  if (!res.data.success) return null;
  
  return res.data.result;
};