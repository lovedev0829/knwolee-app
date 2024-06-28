import { IQueryQuestion } from "src/types/queryQuestion.interface";
import { ServerResponse, apiRequest } from "./client";

export type RegenerateResponsePayload = {
  content: string;
  queryQuestionId: string;
};

export const regenerateResponseAPI = async (
  token: string,
  data: RegenerateResponsePayload
) => {
  const res = await apiRequest<ServerResponse<IQueryQuestion>>(
    "post",
    "query/regenerate-response",
    token,
    data
  );
  if (!res.data.success) return null;
  return res.data.result;
};
