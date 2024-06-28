import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import UploadSourceIcon from "src/Icons/UploadSourceIcon";
import { getToken, useUserData } from "src/api/queries";
import { uploadFileFTB } from "src/api/requests/uploadIndex";
import {
  FileUploadStatus,
  PdfUploadFormData,
} from "src/types/upload.interface";
import { UPLOAD_STATUS } from "src/utils/constants";
import FileUploadModal from "./Modal";
import { ActionButton } from "../SourceCard";
import { AxiosError } from "axios";
import { ServerResponse } from "src/api/requests/client";

function FileUploadSourceCard() {
  const textColor = useColorModeValue("neutral.90", "neutral.10");
  const borderColor = useColorModeValue("neutral.20", "neutral.05100");
  const {
    isOpen: isOpenFileUploadModal,
    onOpen: onOpenFileUploadModal,
    onClose: onCloseFileUploadModal,
  } = useDisclosure();

  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userData } = useUserData();

  const [uploadStatus, setUploadSatus] = useState<FileUploadStatus>(
    UPLOAD_STATUS.IDLE
  );

  const createPdfUploadFormData = (data: PdfUploadFormData): FormData => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("userId", data.userId);
    return formData;
  };

  const handleFileUpload = async (file: File) => {
    if (!userData || !file) return;

    setUploadSatus(UPLOAD_STATUS.UPLOADING);

    const data: PdfUploadFormData = {
      file: file,
      userId: userData.id,
    };
    const formData = createPdfUploadFormData(data);

    try {
      const token = await getToken(
        getAccessTokenSilently,
        getAccessTokenWithPopup
      );
      if (!token) {
        throw new Error("Failed to get token");
      }
      const textData = await uploadFileFTB(formData, token);
      toast({
        title: "File successfully uploaded.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUploadSatus(UPLOAD_STATUS.SUCCESS);
      //console.log(textData);
    } catch (error) {
      const errorMessage = (error as AxiosError<ServerResponse<unknown>>)
        ?.response?.data?.message;
      toast({
        title: "An error occurred.",
        description: errorMessage || `Something went wrong with the file upload`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setUploadSatus(UPLOAD_STATUS.ERROR);
    } finally {
      void queryClient.invalidateQueries(["userKnowledge"]);
    }
  };

  return (
    <>
      <Box
        display="flex"
        width={["full", "calc(50% - 8px)", "300px", "242px"]}
        padding="20px 24px"
        flexDirection="column"
        justifyContent="center"
        alignItems="flexStart"
        gap="20px"
        borderRadius="12px"
        border="1px solid"
        borderColor={borderColor}
        backgroundColor="neutral.'01100'"
      >
        <Box
          display="flex"
          height="60px"
          alignItems="center"
          gap="16px"
          alignSelf="stretch"
        // opacity={isLocked ? 0.4 : 1}
        >
          <Box
            w="60px"
            h="60px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="10px"
          // bg={iconColor}
          >
            <UploadSourceIcon />
          </Box>
          <Text
            color={textColor}
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            File Upload
          </Text>
        </Box>
        <ActionButton action="Upload" onClickAction={onOpenFileUploadModal} />
      </Box>

      <FileUploadModal
        onFileReceived={handleFileUpload}
        uploadStatus={uploadStatus}
        isOpen={isOpenFileUploadModal}
        onClose={onCloseFileUploadModal}
      />
    </>
  );
}

export default FileUploadSourceCard;
