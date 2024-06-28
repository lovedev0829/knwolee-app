import { Notification } from "../../utils/types";
import { ServerResponse, apiRequest } from "./client";

export const getUserNotifications = async (token: string): Promise<Notification[] | null>  => {
  const res = await apiRequest<ServerResponse<Notification[]>>('get', `notifications`, token);
  if (!res.data.success) return null
  return res.data.result
}

export const markUserNotiicationsAsViewed = async (notificationsIds: string[], token: string): Promise<Notification[] | null>  => {
  const res = await apiRequest<ServerResponse<Notification[]>>('put', `notifications/markAsViewed`, token, notificationsIds);
  if (!res.data.success) return null
  return res.data.result
}

export const markUserNotificationsAsUnread = async (notificationsIds: string[], token: string): Promise<Notification[] | null> => {
  const res = await apiRequest<ServerResponse<Notification[]>>('put', `notifications/markAsUnread`, token, notificationsIds);
  if (!res.data.success) return null;
  return res.data.result;
}

export const deleteUserNotification = async (notificationId:string, token: string): Promise<Notification[] | null>  => {
  const res = await apiRequest<ServerResponse<Notification[]>>('delete', `notifications`, token, notificationId);
  if (!res.data.success) return null
  return res.data.result
}
