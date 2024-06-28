import { Conversation } from "src/components/Conversation/Conversations";
import { ServerResponse, apiRequest } from "./client";
import { ThreadMessage } from "src/types/threads.interface";
import { IMessageList } from "src/utils/types";
import { UserThread } from "src/types/userAgent.interface";
import { INewThreadPayload } from "../mutations/agentThreads";
import { Run } from "openai/resources/beta/threads/index.mjs";

export const getUserAgentThreads = async (
  token: string
) => {
  const res = await apiRequest<ServerResponse<UserThread[]>>(
    "get",
    "knowlee-agent/user-threads",
    token,
  );
  return res.data.result;
};

interface AddMessageInThreadResponse  {
  message: ThreadMessage;
  createdRun: Run;
  userThread: UserThread;
}

export type AddMessagePayload = {
  threadId?: string,
  textMessage: string,
  shouldRun: boolean,
  assistantId?: string,
  title: string
}

export const addMessageInUserAgentThreads = async (
  token: string,
  payload: AddMessagePayload
) => {
  const res = await apiRequest<ServerResponse<AddMessageInThreadResponse>>(
    "post",
    "knowlee-agent/user-threads-message",
    token,
    payload,
    {
      params: {},
    }
  );
  if (!res.data.success) return null;
  return res.data.result;
};

export const getUserThreadStatus = async (
  token: string,
  threadId: string,
  runId: string
) => {
  const res = await apiRequest<ServerResponse<Run>>(
    "get",
    "/knowlee-agent/user-threads/run",
    token,
    { threadId, runId },
    {
      params: {
        threadId, runId
      },
    }
  );
  return res.data.result;
};

export const getUserThread = async (
  token: string,
  threadId: string
) => {
  const res = await apiRequest<ServerResponse<IMessageList>>(
    "get",
    `/knowlee-agent/user-threads-message/${threadId}`,
    token,
  );
  if (!res.data.success) return null;
  return res.data.result.data;
};


export const createUserAgentThread = async (token: string, payload: INewThreadPayload)
    : Promise<Conversation | null> => {
    const res = await apiRequest<ServerResponse<Conversation>>('post', `knowlee-agent/user-threads`, token, payload);
    if (!res.data.success) return null;
    return res.data.result;
};

export const updateUserAgentThread = async (
  token: string,
  threadId: string,
  payload: { title: string }
): Promise<Conversation | null> => {
  const res = await apiRequest<ServerResponse<Conversation>>(
    "PATCH",
    `knowlee-agent/user-threads/${threadId}`,
    token,
    payload
  );
  if (!res.data.success) return null;
  return res.data.result;
};

export const deleteAgentThread = async (token: string, threadId: string)
  : Promise<Conversation | null> => {
  const res = await apiRequest<ServerResponse<Conversation>>('delete', `knowlee-agent/user-threads/${threadId}`, token);
  if (!res.data.success) return null;
  return res.data.result;
};