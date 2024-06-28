import { useState } from "react";
import { PanelOptionType, PANEL_OPTIONS } from "src/types/panel";

export const assistantMessages = {
  [PANEL_OPTIONS.AUDIO]: "Audio Mode Activated! Send me your text and I'll transform it into crisp, clear audio. You can pick up different voices or upload yours in Settings!",
  [PANEL_OPTIONS.IMAGE]: "Advanced Image Mode: Choose between SDXL and DALL-E 3 models for your creations! With SDXL,  you can exclude specific elements by using the negative prompts. What stunning masterpiece can we craft for you today?",
  [PANEL_OPTIONS.IMAGE_INTERPRETER]: "Image Vision Mode ON! Unleash my power of Knowlee to interpret and understand images. Provide a URL, and I'll delve into the image, offering rich insights and interpretations.",
  [PANEL_OPTIONS.VIDEO_INTERPRETER]: "Video Vision activated! Give me a YouTube video and I'll tell you what I see.",
  [PANEL_OPTIONS.VIDEO]: "Video Mode activated! Feed me your scripts, and watch as I transform them into captivating videos.",
  [PANEL_OPTIONS.DOCUMENT]: "Document Helper Mode: On! Upload a PDF and ask anything you need.",
  [PANEL_OPTIONS.SPEECHTOTEXT]: "Voice Prompt Creator: Record an audio to generate your next prompt",

};

export const usePanelOptions = () => {
  const [panelOption, setPanelOption] = useState<PanelOptionType | null>(null);

  if (!panelOption) return { panelOption, setPanelOption, assistantMessage: "" };

  return {
    panelOption,
    setPanelOption,
    assistantMessage: assistantMessages[panelOption],
  };
};
