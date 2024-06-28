import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { getToken, useUserData } from ".";
import { getDocumentUserChatHistory } from "../requests/documentChatIndex";


export function useDocumentUserChatHistory() {
  const { data: userData } = useUserData();
  const userId = userData?.id;
  //console.log('using userid : ' , userId)
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useQuery(["userChatHistory", userId], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getDocumentUserChatHistory(userId || "", token);
  }, {
    enabled: !!userId,
  });
}

