import { ServerResponse, apiRequest } from "./client";

export type TextToSpeechPayload = {
    text: string;
};

export const getTextToSpeechResponse = async (
    token: string,
    payload: TextToSpeechPayload
  ) => {
    const res = await apiRequest<ServerResponse<{type: string, data: Buffer}>>(    
      "post",
      `/queryMedia/text-to-speech`,
      token,
      payload
    );
        return res.data.result;
  };