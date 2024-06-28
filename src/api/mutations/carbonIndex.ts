import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { handleCarbonSuccessEvent } from "../requests/carbonIndex";
import { OnSuccessData } from "carbon-connect";

export const useHandleCarbonSuccessEventMutation = () => {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useMutation(async (data: OnSuccessData) => {
    const token = await getToken(
      getAccessTokenSilently,
      getAccessTokenWithPopup
    );
    if (!token) throw new Error("Failed to get token");
    return handleCarbonSuccessEvent(token, data);
  });
};
