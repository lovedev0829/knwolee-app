import axios, { AxiosResponse } from "axios";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { apiRequest, ServerResponse } from "../api/requests/client";
import { MutationResponse, TextToImageModels } from "../types/panel";

export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-4o",
}

export interface Message {
  role: Role;
  content: string;
}

export interface SpeechToTextResponse {
  text: string;
}

export interface SpeechToSpeechResponse {
  data: number[];
  type: "buffer"
}

export type Role = "assistant" | "user";

interface GetImageResponseData {
  prompt: string,
  negative_prompt?: string,
  textToImageModel?: TextToImageModels,
}

export interface ImageInterpreterPayload {
  prompt: string,
  image_url: string,
  images: FileList | null,
}

export interface VideoInterpreterPayload {
  command: string,
  videoURL: string,
  frameRate?: number
}

export const checkRegularExp = (data: string) => {
  const regexp = /^[A-Za-z0-9_-]*$/;
  return regexp.test(data);
};

export const validateUri = (uri: string) => {
  if (!uri || uri == "_") return false;
  return true;
};

export const OpenAIStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: `You are a helpful, friendly, assistant.`,
        },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.0,
      stream: true,
    }),
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      if (res.body) {
        for await (const chunk of streamAsyncIterable(res.body)) {
          parser.feed(decoder.decode(chunk));
        }
      } else {
        throw new Error("Response body is null");
      }
    },
  });

  return stream;
};

async function* streamAsyncIterable(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export const getChatResponse = async (messages: Message[], conversationId: string, queryQuestionId?: string) => {
  // try {
    const charLimit = 12000;
    let charCount = 0;
    const messagesToSend = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (charCount + message.content.length > charLimit) {
        break;
      }
      charCount += message.content.length;
      messagesToSend.push(message);
    }

    const queryResponse: AxiosResponse<MutationResponse> = await axios.post("/query", {
      query: messages[messages.length - 1].content,
      conversationId: conversationId,
      queryQuestionId: queryQuestionId
    }
    )

    const pineconeData = queryResponse.data

    //console.log("backend response", pineconeData);

    // return new Response(JSON.stringify(pineconeData, null, 2));
    return pineconeData;
  // } catch (error) {
  //   console.error(error);
  //   // return error;
  //   // return new Response("Error", { status: 500 });
  // }
};


// TODO: Move these to a separate api file with return types
export const getImageResponse = async (getImageResponseData: GetImageResponseData, conversationId: string) => {
  const response: AxiosResponse<{ imageUrl: string }> = await axios.post("/queryMedia/image", {
    ...getImageResponseData,
    conversationId: conversationId,
  })

  return response.data.imageUrl;
}

export const getAudioResponse = async (message: Message, conversationId: string) => {
  const response: AxiosResponse<{ audioUrl: string }> = await axios.post("/queryMedia/audio", {
    prompt: message.content,
    conversationId: conversationId,
  })

  return response.data.audioUrl
}

export const getImageInterpreterResponse = async (
  imageInterpreterPayload: FormData,
) => {
  const response = await axios.post<ServerResponse<{ messageContent: string }>>(
    "/queryMedia/image-interpreter",
    imageInterpreterPayload
  );

  return response.data.result;
};

export const getVideoPreviewResponse = async (message: Message, conversationId: string) => {
  const response = await axios.post("/queryMedia/videoPreview", {
    prompt: message.content,
    conversationId: conversationId,
  })

  return response.data
}

export const getVideoRenderResponse = async ({ audio, output, scenes }: videoRenderProps) => {
  const response = await axios.post("/queryMedia/videoRender", {
    audio,
    output,
    scenes
  })

  return response.data.videoUrl
}

export const getAudioTranscriptionResponse = async (
  token: string,
  formData: FormData
) => {
  const res = await apiRequest<ServerResponse<SpeechToTextResponse>>(
    "post",
    `/queryMedia/speech-to-text`,
    token,
    formData
  );
  return res.data.result;
};

export const getVideoInterpreterResponse = async (
  videoInterpreterPayload: VideoInterpreterPayload,
  conversationId: string
) => {
  const response = await axios.post<ServerResponse<{ messageContent: string }>>(
    "/queryMedia/video-to-text",
    {
      ...videoInterpreterPayload,
      conversationId: conversationId,
    }
  );

  return response.data.result;
}; // Added missing closing brace here

export const getSpeechToSpeechResponse = async (
  token: string,
  formData: FormData
) => {
  const res = await apiRequest<ServerResponse<SpeechToSpeechResponse>>(
    "post",
    `/queryMedia/speech-to-speech`,
    token,
    formData
  );
  return res.data.result;
};