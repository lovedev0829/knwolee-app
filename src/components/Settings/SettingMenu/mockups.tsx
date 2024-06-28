import { ProfileIcon, LockIcon, BellIcon, ConfigIcon, InfoIcon, BillingIcon, EnvelopIcon } from '../Icons';
import TextToAudioIcon from '../Icons/TextToAudioIcon';
import { MenuProps } from './types';

export const menus: MenuProps[] = [
  {
    icon: ProfileIcon,
    title: "Edit Profile",
    route: "profile",
  },
  {
    icon: LockIcon,
    title: "Password",
    route: "update-password",
  },
  // {
  //   icon: ConfigIcon,
  //   title: "Preferences",
  //   route: "preferences",
  // },
  {
    icon: BellIcon,
    title: "Notifications",
    route: "notifications",
  },
  {
    icon: BillingIcon,
    title: "Billing",
    route: "billing",
  },
  {
    icon: TextToAudioIcon,
    title: "Text to Audio",
    route: "text-to-audio",
  },
  {
    icon: ConfigIcon,
    title: "API Key",
    route: "api-key",
  }/*,
  {
    icon: InfoIcon,
    title: "Action",
    route: "action",
  },*/
];