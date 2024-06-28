import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import {
  handleGoogleDriveTextRequest,
  handleOnedriveFileRequest,
} from "../requests/entityIndex";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";

export const useHandleGoogleDriveTextMutation = () => {
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (data: unknown) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");
      return handleGoogleDriveTextRequest(token, data);
    },
    {
      onSuccess: () => {
        toast({
          title: "Learning in Progress.",
          description: "Please check the status in a few moments to see what I've learned.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<unknown>>) => {
        const errorMessage = error?.response?.data?.message;
        if (errorMessage && typeof errorMessage === "string") {
          toast({
            title: "An error occurred.",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
};

export const useHandleOneDriveFilePickMutation = () => {
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (data: { itemId: string }) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");
      return handleOnedriveFileRequest(token, data);
    },

    {
      onSuccess: () => {
        toast({
          title: "File uploaded successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        const responseErrorMessage = (
          error as AxiosError<ServerResponse<unknown>>
        )?.response?.data?.message;
        if (responseErrorMessage && typeof responseErrorMessage === "string") {
          toast({
            title: "An error occurred.",
            description: responseErrorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
};
