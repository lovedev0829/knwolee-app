import {
  ActionType,
  CarbonConnect,
  CarbonConnectProps,
  OnSuccessData,
} from "carbon-connect";
import { getCarbonAIAccessToken } from "src/api/requests/carbonIndex";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken, useUserData } from "src/api/queries";
import { useHandleCarbonSuccessEventMutation } from "src/api/mutations/carbonIndex";

function CarbonConnectModal(props: Partial<CarbonConnectProps>) {
  // const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userData } = useUserData();
  const userId = userData?.id || "";

  const { mutateAsync: handleCarbonEvent } =
    useHandleCarbonSuccessEventMutation();

  const tokenFetcher = async () => {
    const token = await getToken(
      getAccessTokenSilently,
      getAccessTokenWithPopup
    );
    if (!token) {
      throw new Error("Failed to get token");
    }
    const res = await getCarbonAIAccessToken(token);
    return res;
  };

  async function handleSuccess(successData: OnSuccessData) {
    // console.log("Data on Success: ", successData);
    const { action, data } = successData;
    switch (action) {
      case ActionType.ADD:
      case ActionType.UPDATE: {
        const file = data?.files?.[0];
        if (!file) {
          console.log("No file data returned from Carbon AI");
          // toast({
          //   title: "Carbon AI Error",
          //   description: "No file data returned from Carbon AI",
          //   status: "error",
          //   duration: 5000,
          //   isClosable: true,
          // });
          return;
        }
        await handleCarbonEvent(successData);
        break;
      }
      case ActionType.CANCEL: {
        break;
      }
      case ActionType.INITIATE: {
        break;
      }
    }
  }

  return (
    <CarbonConnect
      orgName="Knowlee"
      brandIcon="./Knowlee_favicon.ico"
      tokenFetcher={tokenFetcher}
      onSuccess={handleSuccess}
      onError={(error) => console.log("Data on Error: ", error)}
      tags={{
        userId: userId,
      }}
      {...props}
    />
  );
}

export default CarbonConnectModal;
