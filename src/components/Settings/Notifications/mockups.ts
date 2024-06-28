import { NotificationSetting } from "src/types";

export const getNotificationSettingWithValue = (
  isOn = true as boolean
): NotificationSetting => ({
  inAppPlatformUpdatesAndAnnouncements: isOn,
  inAppSpecialOffersAndPromotions: isOn,
  emailPlatformUpdatesAndAnnouncements: isOn,
  emailSpecialOffersAndPromotions: isOn,
});

export const initialNotificationSetting: NotificationSetting = getNotificationSettingWithValue(true);
