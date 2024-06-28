import { NOTIFICATION_SETTINGS_OPTIONS } from "../utils/constants";
import { SOURCE_TYPES } from "../utils/types";
import { IPlayHTClonedVoice } from "./playHT.interface";

export interface ITextToAudioSetting {
  voice: string;
  clonedVoices: IPlayHTClonedVoice[]
}

export type DowngradeAnswers = {
  why: string;
  suggestion?: string;
};

export interface UserSetting {
  user: string;
  notification: NotificationSetting;
  preference: Preference;
  action: SettingAction;
  textToAudioSetting: ITextToAudioSetting;
  specialDiscountUsed?: boolean;
  downgradeAnswers?: DowngradeAnswers;
}

type ValueOf<T> = T[keyof T];

export type NotificationSettingOption =  (typeof NOTIFICATION_SETTINGS_OPTIONS)[keyof typeof NOTIFICATION_SETTINGS_OPTIONS]
export type NotificationSettingOptions = {
  [K in ValueOf<typeof NOTIFICATION_SETTINGS_OPTIONS>]: boolean;
};
export type Platform = SOURCE_TYPES.TWITTER | SOURCE_TYPES.MEDIUM;
export interface NotificationSetting {
  inAppPlatformUpdatesAndAnnouncements: boolean;
  inAppSpecialOffersAndPromotions: boolean;
  emailPlatformUpdatesAndAnnouncements: boolean;
  emailSpecialOffersAndPromotions: boolean;
}


export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Preference {
  language: string;
}

export interface SettingAction {
  includeSavingData: boolean;
  notify: boolean;
  analyzeData: boolean;
}
