import { AttachmentIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
interface UserSettingsAvatarProps {
  onFileSelect: (file: FileList) => void;
}

const MultipleImagesUploader: React.FC<UserSettingsAvatarProps> = ({
  onFileSelect: onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    onFileSelect(files);
  };

  return (
    <Flex
      gap="24px"
      // width="100%"
      mr="2"
      flexDirection={["column", "column", "column", "row"]}
      alignItems="center"
    >
      <Flex direction="column" justifyContent="space-between">
        <Input
          type="file"
          accept="image/*"
          position="fixed"
          left="-100vw"
          top="-100vh"
          onChange={handleChangeFile}
          ref={fileInputRef}
          multiple
        />
        <IconButton
          aria-label="Close announcement"
          icon={<AttachmentIcon />}
          size="md"
          onClick={() => fileInputRef.current?.click()}
        />
        {/* <Text
          fontSize="13px"
          fontWeight="500"
          lineHeight="12px"
          color="neutral.60"
          textAlign="center"
        >
          JPG, PNG and GIF is allowed.
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default MultipleImagesUploader;
