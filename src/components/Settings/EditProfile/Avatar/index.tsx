import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import useUserAvatar from "../../../hooks/UseUserAvatar";

interface UserSettingsAvatarProps {
  setAvatarFile: (file: File) => void;
}

const UserSettingsAvatar: React.FC<UserSettingsAvatarProps> = ({
  setAvatarFile,
}) => {
  const borderColor = useColorModeValue("neutral.30", "#343839");
  const textColor = useColorModeValue("neutral.90", "neutral.10");

  const { avatarURL, isAvatarLoading, setAvatarImageToUpload, setIsCDNLoading } =
    useUserAvatar();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    setAvatarFile(file);

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => setAvatarImageToUpload(reader.result as string),
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex
      gap="24px"
      width="100%"
      flexDirection={["column", "column", "column", "row"]}
      alignItems="center"
    >
      <AspectRatio ratio={1} width="112px">
        <>
          {isAvatarLoading && (
            <Box>
              <Spinner size="xl" speed="0.8s" color="primary.50" />
            </Box>
          )}
          <Avatar
            src={avatarURL}
            onLoad={() => setIsCDNLoading(false)}
            name="Avatar"
            borderWidth="0px"
            borderStyle="solid"
            borderColor="neutral.36"
            opacity={!isAvatarLoading ? 1 : 0}
            transition="opacity 0.3s"
          />
        </>
      </AspectRatio>
      <Flex direction="column" justifyContent="space-between">
        <Input
          type="file"
          accept="image/*"
          position="fixed"
          left="-100vw"
          top="-100vh"
          onChange={handleChangeFile}
          ref={fileInputRef}
        />
        <Button
          px="24px"
          py="12px"
          borderRadius="10px"
          borderWidth="2px"
          borderStyle="solid"
          borderColor={borderColor}
          fontSize="16px"
          fontWeight="500"
          lineHeight="24px"
          color={textColor}
          backgroundColor="transparent"
          onClick={() => fileInputRef.current?.click()}
          _hover={{}}
        >
          Upload new image
        </Button>
        <Text
          fontSize="13px"
          fontWeight="500"
          lineHeight="20px"
          color="neutral.60"
          textAlign="center"
        >
          At least 800x800 px recommended. <br />
          JPG, PNG and GIF is allowed.
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserSettingsAvatar;
