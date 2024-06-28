import { GetTokenSilentlyOptions, GetTokenWithPopupOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../requests/userIndex";
import { GetAllUserScrapedEntitiesParams, getAllUserEntities, getAllUserScrapedEntities } from "../requests/userKnowledgeIndex";
import { getUserSetting } from "../requests/userSettingIndex";
import { getUserNotifications, markUserNotiicationsAsViewed } from "../requests/notificationsIndex";
import { getDashboardrecent, getDashboardsummary } from "../requests/dashboardsummaryIndex";
import { IEntityFilter } from "src/components/Sources/SourcesTable";

// Token handling function
export const getToken = async (
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string | undefined>,
  getAccessTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string | undefined>,
): Promise<string | undefined> => {
  try {
    const token = await getAccessTokenSilently();
    return token;
  } catch (error) {
    if (error instanceof Error && error.message === 'consent_required') {
      const token = await getAccessTokenWithPopup();
      return token;
    } else {
      throw error;
    }
  }
};

export function useUserData() {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const userAuth0Id = user?.sub || "";

  return useQuery(["user", userAuth0Id], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getUser(userAuth0Id , token);
  }, {
    enabled: !!userAuth0Id,
  });
}

export function useUserKnowledgeData(filter?: IEntityFilter) {
  const { data: userData } = useUserData();
  const userId = userData?.id || "";
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useQuery(["entity", "all", userId, filter], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getAllUserEntities(userId, token, filter);
  }, {
    enabled: !!userId,
  });
}

export function useUserScrapedData(params?:GetAllUserScrapedEntitiesParams) {
  const { data: userData } = useUserData();
  const userId = userData?.id || "";
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useQuery(["entity", "all-scraped", userId, params], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getAllUserScrapedEntities(userId, token, params);
  }, {
    enabled: !!userId,
  });
}

export function useUserSetting() {
  const { data: userData } = useUserData();
  const userId = userData?.id || "";
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useQuery(["userUserSetting", userId], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getUserSetting(userId, token);
  }, {
    enabled: !!userId,
  });
}

export function useUserNotifications() {
  const { data: userData } = useUserData();
  const userId = userData?.id;
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return useQuery(["userNotifications", userId], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getUserNotifications(token);
  }, {
    enabled: !!userId,
  });
}

export function useDashboardsummaryData() {
  const { data: userData } = useUserData();
  const userId = userData?.id || "";
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  
  return useQuery(["dashboardsummary", userId], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getDashboardsummary(userId, token);
  }, {
    enabled: !!userId,
  });
}

export function useDashboardrecentData() {
  const { data: userData } = useUserData();
  const userId = userData?.id || "";
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  
  return useQuery(["dashboardrecent", userId], async () => {
    const token = await getToken(getAccessTokenSilently, getAccessTokenWithPopup);
    if (!token) {
      throw new Error("Failed to get token");
    }
    return getDashboardrecent(userId, token);
  }, {
    enabled: !!userId,
  });
}
