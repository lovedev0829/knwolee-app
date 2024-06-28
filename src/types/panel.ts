import { UseMutationResult } from "@tanstack/react-query";
import { Message } from "src/utils/types";

export const PANEL_OPTIONS = {
  IMAGE: "image",
  AUDIO: "audio",
  VIDEO: "video",
  DOCUMENT: "document",
  SPEECHTOTEXT: "speech-to-text",
  IMAGE_INTERPRETER: "image-interpreter",
  VIDEO_INTERPRETER: "video-interpreter",
} as const;

export type PanelOptionType = (typeof PANEL_OPTIONS)[keyof typeof PANEL_OPTIONS];

type DataTypeMapping = {
  chatbot: string;
  image: string;
  audio: string;
  video: string;
  document: string;
  
  // Allowing image interpreter to use multiple images
  // "image-interpreter": string[];
};

type DataType<T> = T extends keyof DataTypeMapping ? DataTypeMapping[T] : never;

export type MetaDataWithType<T extends PanelOptionType> = {
  type: T;
  data: DataType<T>;
};

export type APIDataTypeMapping = {
  [PANEL_OPTIONS.AUDIO]: { audioUrl: string };
  [PANEL_OPTIONS.DOCUMENT]: object;
  [PANEL_OPTIONS.IMAGE]: { imageUrl: string };
  [PANEL_OPTIONS.VIDEO]: {
    videoUrl: string,
    videoRenderParams: {
      audio: never,
      output: never,
      scenes: never,
    },
  };
};

export type MutationInput = {
  updatedMessages: Message[];
}

export type MutationResponse = {
  query: string;
  answer: string;
}

export type NewQueryMutationType = UseMutationResult<MutationResponse | undefined, unknown, MutationInput, unknown>

export type TextToImageModels = "SDXL" | "DALLE";

export interface ConfigOptions {
  negative_prompt?: string
  image_url?: string;
  textToImageModel?: TextToImageModels;
  videoURL?: string;
  command?: string
  frameRate?: number;
  images?: FileList | null;
}
// export interface VideoConfigOptions {
//   videoURL: string;
//   command: string
//   frameRate?: number;
//   type: "video"
// }