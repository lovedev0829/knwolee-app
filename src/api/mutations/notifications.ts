import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ServerResponse } from "../requests/client";
import { deleteUserNotification, markUserNotiicationsAsViewed, markUserNotificationsAsUnread } from "../requests/notificationsIndex";
import { getToken } from "../queries";


export const useMarkNotificationsAsViewedMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (notificationsIds: string[]) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return markUserNotiicationsAsViewed(notificationsIds, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userNotifications"]);
      },
      onError: (error: AxiosError<ServerResponse<Notification[]>>) => {
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

export const useMarkNotificationsAsUnreadMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (notificationsIds: string[]) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return markUserNotificationsAsUnread(notificationsIds, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userNotifications"]);
      },
      onError: (error: AxiosError<ServerResponse<Notification[]>>) => {
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

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (notificationId: string) => {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) throw new Error("Failed to get token");

      return deleteUserNotification(notificationId, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userNotifications"]);
        toast({
          title: "Marked as viewed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<Notification[]>>) => {
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