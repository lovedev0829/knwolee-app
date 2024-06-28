export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio: string;
  cryptoInsightInterests: string[];
  level?: number;
  loyaltyPoints?: number;
  isSegmentationCompleted: boolean;
  onboardingStep?: number;
  hasAcceptedTosPp: boolean;
  createdAt: string;
  refCode?: string;
  cookiesAccepted: boolean;
  isSuperAdmin: boolean;
  welcomeTourCompleted: boolean;
}

export interface UserDto extends User {
  avatarFile?: File;
}