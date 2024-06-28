import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useUserData } from "../../../api/queries";

const placeholderImage = "/images/no-profile.jpg";

const useUserAvatar = () => {
  const { user: auth0User, isLoading: isUserLoading } = useAuth0();
  const { data: mongoDBUser, isLoading: userDataLoading } = useUserData();

  const [avatarURL, setAvatarURL] = useState<string>("");
  const [avatarImageToUpload, setAvatarImageToUpload] = useState<string>("");
  const [isCDNLoading, setIsCDNLoading] = useState(true);

  const isAvatarLoading = isUserLoading || userDataLoading || isCDNLoading;
  const isExternalLoading= isUserLoading || userDataLoading ;

  useEffect(() => {
    if (!isExternalLoading) {
      if (avatarImageToUpload) setAvatarURL(avatarImageToUpload);
      else if (mongoDBUser?.profilePicture) setAvatarURL(mongoDBUser?.profilePicture);
      else if (auth0User?.picture) setAvatarURL(auth0User?.picture);
      else setAvatarURL(placeholderImage);
    }
  }, [isAvatarLoading, isExternalLoading, avatarURL, mongoDBUser, auth0User, avatarImageToUpload, isCDNLoading]);

  return { avatarURL, isAvatarLoading, setAvatarImageToUpload, setIsCDNLoading };
};

export default useUserAvatar;
