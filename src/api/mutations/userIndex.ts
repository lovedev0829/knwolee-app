import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { User, UserSetting } from "src/types";
import { useAuth0 } from "@auth0/auth0-react";
import { ServerResponse } from "../requests/client";
import { getToken } from "../queries";
import { deleteUserAccountRequest, updateProfile } from "../requests/userIndex";
import { updateUserSetting } from "../requests/userSettingIndex";
import { NewSegmentationPayload, SegmentationQuestions } from "../../types/user.segmentation";
import { createNewSegmentation, createSegmentation } from "../requests/userSegmentation";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: FormData) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return updateProfile(payload, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["user"]);
        toast({
          title: "Profile successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<User>>) => {
        if (error.response) {
          const { message } = error.response.data;
          toast({
            title: "An error occurred.",
            description: `Error: ${message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
};

export const useUpdateUserSettingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: UserSetting) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return updateUserSetting(payload, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userSetting"]);
        toast({
          title: "Setting successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<UserSetting>>) => {
        if (error.response) {
          const { message } = error.response.data;
          toast({
            title: "An error occurred.",
            description: `Error: ${message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
}

export const useCreateSegmentationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: SegmentationQuestions) => {
      const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
      if (!token) throw new Error("Failed to get token")

      return createSegmentation(payload, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["user"]);
        toast({
          title: "Entries successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<SegmentationQuestions>>) => {
        if (error.response) {
          const { message } = error.response.data;
          toast({
            title: "An error occurred.",
            description: `Error: ${message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
};

export const useCreateNewSegmentationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: NewSegmentationPayload) => {
      const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
      if (!token) throw new Error("Failed to get token")

      return createNewSegmentation(payload, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["user"]);
        toast({
          title: "Entries successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<SegmentationQuestions>>) => {
        if (error.response) {
          const { message } = error.response.data;
          toast({
            title: "An error occurred.",
            description: `Error: ${message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
};


export const useDeleteUserAccountMutation = () => {
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async () => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return deleteUserAccountRequest(token);
    },
    {
      onSuccess: () => {
        toast({
          title: "User account deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<unknown>>) => {
        if (error.response) {
          const { message } = error.response.data;
          toast({
            title: "An error occurred.",
            description: `Error: ${message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );
}
