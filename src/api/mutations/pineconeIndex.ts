import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { UpsertPinconeVectorPayload, upsertPineconeVector } from "src/api/pineconeIndex";
import { getToken } from "../queries";

export const useUpsertPineconeVectorMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const toast = useToast();

    return useMutation(
        async (payload: UpsertPinconeVectorPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return upsertPineconeVector(token, payload)
        },
        {
            onSuccess: () => {
                // Show success toast
                toast({
                    title: "Upserted successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    );
};
