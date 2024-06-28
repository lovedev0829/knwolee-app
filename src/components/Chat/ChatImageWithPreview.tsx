import { FC } from "react";
import EnlargeImageModal from "../Modal/EnlargeImageModal";
import { Box, Image, useDisclosure } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
}
const ChatImageWithPreview: FC<Props> = ({ src, alt = "Knowlee chat images" }) => {
  const {
    isOpen: isOpenEnlargeImage,
    onOpen: onOpenEnlargeImage,
    onClose: onCloseEnlargeImage,
  } = useDisclosure();

  return (
    <Box py="2">
      <Image
        width="full"
        height="auto"
        alt={`Local image ${alt}`}
        maxWidth="250px"
        src={src}
        borderRadius="12px"
        cursor="pointer"
        onClick={() => {
          onOpenEnlargeImage();
        }}
      />
      <EnlargeImageModal
        isOpen={isOpenEnlargeImage}
        onClose={onCloseEnlargeImage}
        src={src}
      />
    </Box>
  );
};

export default ChatImageWithPreview;
