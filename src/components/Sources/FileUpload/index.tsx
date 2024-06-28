import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  InputGroup,
  useColorMode,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import UploadIcon from "../../../Icons/UploadIcon";
import { FileUploadStatus, PdfUploadFormData } from "../../../types/upload.interface";
import FileUploadModal from "./Modal";
import { UPLOAD_STATUS } from "../../../utils/constants";
import { getToken, useUserData } from "../../../api/queries";
import { uploadFileFTB } from "../../../api/requests/uploadIndex";
import { AxiosError } from "axios";
import { ServerResponse } from "src/api/requests/client";


const FileUpload: React.FC = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const toast = useToast();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { data: userData } = useUserData();

  const [uploadStatus, setUploadSatus] = useState<FileUploadStatus>(UPLOAD_STATUS.IDLE);

  const createPdfUploadFormData = (data: PdfUploadFormData): FormData => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("userId", data.userId);
    return formData;
  };

  const handleFileUpload = async (file: File) => {
    if (!userData || !file) return;

    setUploadSatus(UPLOAD_STATUS.UPLOADING)

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
      setUploadSatus(UPLOAD_STATUS.SUCCESS)
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
      setUploadSatus(UPLOAD_STATUS.ERROR)
    } finally {
      void queryClient.invalidateQueries(["userKnowledge"]);
    }
  };

  return (
    <>
      <InputGroup {...rest} w="auto">
        <Button
          color={colorMode === "dark" ? "neutral.100" : "white"}
          bg={colorMode === "dark" ? "neutral.10" : "#191A1A"}
          borderRadius="10px"
          _hover={colorMode === "dark" ? {} : undefined}
          padding="8px 16px"
          fontSize="16px"
          fontWeight="500"
          onClick={()=> onOpen()}
          leftIcon={<UploadIcon />}
        >
          {"File Upload"}
        </Button>
      </InputGroup>

      <FileUploadModal onFileReceived={handleFileUpload} uploadStatus={uploadStatus} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FileUpload;
