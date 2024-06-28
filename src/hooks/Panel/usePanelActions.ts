import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNewConversationMutation } from "src/api/mutations/conversationIndex";
import { ServerResponse } from "src/api/requests/client";
import { Conversation } from "src/components/Conversation/Conversations";
import { ConfigOptions, PANEL_OPTIONS, PanelOptionType } from "src/types/panel";
import {
  ImageInterpreterPayload,
  getAudioResponse,
  getImageInterpreterResponse,
  getImageResponse,
  getVideoInterpreterResponse,
  getVideoPreviewResponse,
  getVideoRenderResponse,
} from "src/utils";
import { Message } from "src/utils/types";

const initialMessages: Message[] = [
]

export const usePanelActions = () => {
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [newConversation, setNewConversation] = useState<Conversation>();

  const createNewConversationMutation = useNewConversationMutation();

  const handlePanelActions = async (message: Message, panelOption: PanelOptionType, configOptions: ConfigOptions) => {
    if (!panelOption || !message) return;
    let conversationId: string;
    if (!newConversation) {
      const newConversationResponse = await createNewConversationMutation.mutateAsync({
        title: message.content,
      });
      if (!newConversationResponse) return;
      conversationId = newConversationResponse._id;
      setNewConversation(newConversationResponse);
    } else {
      conversationId = newConversation._id;
    }

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    const handleAudioAction = async () => {
      setIsActionLoading(true)
      try {
        const audioResponse = await getAudioResponse(message, conversationId);
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: ``,
            metaData: {
              type: PANEL_OPTIONS.AUDIO,
              data: audioResponse
            }
          },
        ]);
      } catch (error) {
        //console.log(error);
      }
      finally {
        setIsActionLoading(false);
      }
    }

    const handleImageAction = async () => {
      setIsActionLoading(true)
      try {
        const imageResponse = await getImageResponse(
          {
            prompt: message.content,
            negative_prompt: configOptions?.negative_prompt,
            textToImageModel: configOptions.textToImageModel,
          },
          conversationId
        );
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: `Here is the result of a photo of ${message.content}`,
            metaData: {
              type: PANEL_OPTIONS.IMAGE,
              data: imageResponse
            }
          },
        ]);
      } catch (error) {
        //console.log(error);
        const responseErrorMessage = (
          error as AxiosError<ServerResponse<unknown>>
        )?.response?.data?.message;
        if (responseErrorMessage) {
          toast({
            title: "An error occurred.",
            description: responseErrorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

      }
      finally {
        setIsActionLoading(false);
      }
    }

    const handleImageInterpreterAction = async () => {
      setIsActionLoading(true);
      try {
        const formData = new FormData();
        formData.append("prompt", message.content);
        formData.append("conversationId", conversationId);
        if(configOptions?.image_url) {
          formData.append("image_url", configOptions?.image_url);
        }
        if(configOptions?.images) {
          for (const file of configOptions.images) {
            formData.append("images", file);
          }
        }

        const data = await getImageInterpreterResponse(
          formData,
        );
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: data.messageContent,
            metaData: {
              type: PANEL_OPTIONS.IMAGE_INTERPRETER,
              data: data.messageContent,
            },
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        const responseErrorMessage = (
          error as AxiosError<ServerResponse<unknown>>
        )?.response?.data?.message;
        if (responseErrorMessage) {
          toast({
            title: "Request failed",
            description: responseErrorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } finally {
        setIsActionLoading(false);
      }
    };

    const handleVideoInterpreterAction = async () => {
      if(!configOptions?.videoURL) return null;
      setIsActionLoading(true);
      try {
        const videoInterpreterPayload = {
          command: message.content,
          videoURL: configOptions?.videoURL,
        };
        const data = await getVideoInterpreterResponse(
          videoInterpreterPayload,
          conversationId
        );
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: data.messageContent,
            metaData: {
              type: PANEL_OPTIONS.IMAGE_INTERPRETER,
              data: data.messageContent,
            },
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsActionLoading(false);
      }
    };

    const handleVideoAction = async () => {
        setIsActionLoading(true)
        try {
          const videoResponse = await getVideoPreviewResponse(message, conversationId);
          setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: `video for ${message.content}`,
            metaData: {
              type: PANEL_OPTIONS.VIDEO,
              data: videoResponse.videoUrl
            }
          },
        ]);
        setIsActionLoading(false);
        
         // Waiting for new video render in background
         //console.log("Generated in Background rendering video");
          const videoRenderResponse: string = await getVideoRenderResponse(videoResponse.videoRenderParams) as string;
         //console.log("NEW VIDEO URL:", videoRenderResponse);
 
         setMessages(prev => prev.map(message_element => {
           if (message_element.metaData?.data === videoResponse.videoUrl) {
             return {
               ...message_element,
               metaData: {
                 data: videoRenderResponse,
                 type: PANEL_OPTIONS.VIDEO
               }
             }
           }
           return message_element;
         }))
       } catch (error) {
         setIsActionLoading(false);
         //console.log(error);
          const responseErrorMessage = (
            error as AxiosError<ServerResponse<unknown>>
          )?.response?.data?.message;
          if (responseErrorMessage) {
            toast({
              title: "Request failed",
              description: responseErrorMessage,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
      }
    }

    switch (panelOption) {
      case PANEL_OPTIONS.AUDIO:
        handleAudioAction()
        return

      case PANEL_OPTIONS.IMAGE:
        handleImageAction()
        return;

      case PANEL_OPTIONS.IMAGE_INTERPRETER:
        handleImageInterpreterAction()
        return;

      case PANEL_OPTIONS.VIDEO_INTERPRETER:
        handleVideoInterpreterAction()
        return;

      case PANEL_OPTIONS.VIDEO:
        handleVideoAction()
        return;
    }
  }

  function resetConversation() {
    setMessages(initialMessages);
    setIsActionLoading(false);
    setNewConversation(undefined);
  }

  return {
    messages,
    setMessages,
    handlePanelActions,
    isActionLoading,
    newConversation,
    setNewConversation,
    resetConversation,
  };
}