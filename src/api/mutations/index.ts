import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Entity, EntityPayload, UserKnowledge } from "../../utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { ServerResponse } from "../requests/client";
import { getToken, useUserData } from "../queries";
import { addEntity, bulkUploadEntityRequest, removeEntity } from "../requests/userKnowledgeIndex";

interface AddEntityPayload {
  userId: string;
  entities: EntityPayload[];
}

interface RemoveEntityPayload {
  userId: string;
  entityId: string;
}

export const useAddEntityMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: AddEntityPayload) => {
      const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
      if (!token) throw new Error("Failed to get token")

      return addEntity(payload.userId, payload.entities, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userKnowledge"]);
        toast({
          title: "Learning in Progress.",
          description: "Please check the status in a few moments to see what I've learned.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<Entity>>) => {
        if (error.response) {
          if(error.response.status === 409) return; 
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

export const useRemoveEntityMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const { data: userData } = useUserData();
  const userId = userData?.id || "";

  return useMutation(
    async (payload: RemoveEntityPayload) => {
      const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
      if (!token) throw new Error("Failed to get token")
      return removeEntity(payload.userId, payload.entityId, token);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userKnowledge"]);
        void queryClient.invalidateQueries(["entity", "all", userId]);
        toast({
          title: "Source deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
      });
      },
    }
  );
};

export const useBulkUploadEntityMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(
    async (payload: FormData) => {
      const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
      if (!token) throw new Error("Failed to get token")

      return bulkUploadEntityRequest(token, payload);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["userKnowledge"]);
        toast({
          title: "Bulk Upload Entries successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ServerResponse<UserKnowledge>>) => {
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