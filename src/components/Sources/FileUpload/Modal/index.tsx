import {
  Box,
  CloseButton,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import CloudIcon from "../../../../Icons/CloudIcon";
import DocumentIcon from "../../../../Icons/DocumentIcon";
import { FileUploadStatus } from "../../../../types/upload.interface";
import { UPLOAD_STATUS } from "../../../../utils/constants";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useUserKnowledgeData } from "../../../../api/queries";

const acceptableFileTypes = [
  // for PDF
  "application/pdf",

  // // for DOCX
  // "application/doc",
  // "application/ms-doc",
  // "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // for TXT
  "text/plain",

  // for CSV
  "text/csv",

  // for JSON
  "application/json",
    // for MP3
    "audio/mp3",

    // for MPEG
    "audio/mpeg",
 
    // for M4A
    "audio/x-m4a",
 
    // for WAV
    "audio/wav",
 
    //for MPGA
    "audio/mpga",
];

interface FileUploadModalProps {
  isOpen: boolean;
  uploadStatus: FileUploadStatus;
  onClose: () => void;
  onFileReceived: (file: File) => Promise<void>;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  uploadStatus,
  onClose,
  onFileReceived,
}) => {
  const { colorMode } = useColorMode();
  const { data: userEntities, isLoading: isEntitiesLoading } =
    useUserKnowledgeData();
  const toast = useToast();

  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function isFileTypeAcceptable(fileType: string) {
    const isAccepted = acceptableFileTypes.includes(fileType);
    if (!isAccepted) {
      toast({
        title: "Invalid file type",
        description: `The file format is not supported`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    return isAccepted;
  }

  const checkIfNameExists = (name: string) => {
    return userEntities?.some((entity) => entity.value === name);
  };

  const onFileSelected = (file: File) => {
    const {size, type, name} = file;
    const isAccepted = isFileTypeAcceptable(type);
    if (!isAccepted) return;
    // check if name alredy exists in source
    if (checkIfNameExists(name)) {
      toast({
        title: "File already exists",
        description: `You already uploaded a file with this name`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if(type.startsWith('audio/') && size > 2.5e+7){
      toast({
        title: "Audio File size exceeded",
        description: `You can upload upto 25 MB audio file only`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onFileReceived(file);
    setFileName(name);
  };

  const [, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (_item, monitor: DropTargetMonitor) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const droppedItem = monitor.getItem() as { files: File[] };
      const files = droppedItem.files;
      if (files && files.length > 0) {
        onFileSelected(files[0]);
      }
    },
  });

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelected(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleModalClose = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const isLoading = uploadStatus === UPLOAD_STATUS.UPLOADING;

  const renderStatusIcon = () => {
    if (uploadStatus === UPLOAD_STATUS.SUCCESS) {
      return <CheckCircleIcon color="green.400" />;
    }
    if (uploadStatus === UPLOAD_STATUS.ERROR) {
      return <WarningTwoIcon color="red.500" />;
    }
    if (uploadStatus === UPLOAD_STATUS.UPLOADING) {
      return <Spinner size="sm" />;
    } else {
      return <CloseButton />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay
        bg={colorMode === "dark" ? "rgba(35, 38, 39, 0.90)" : undefined}
      />
      <ModalContent
        maxWidth="504px"
        p={["20px 20px", "20px 20px", "48px 40px"]}
        borderRadius="24px"
        backgroundColor={colorMode === "dark" ? "neutral.100" : undefined}
      >
        <ModalCloseButton />
        {isEntitiesLoading ? (
          <Flex w="full" h="300px" justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <>
            <ModalBody p={0}>
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <CloudIcon />
                <Text
                  mt="16px"
                  color="neutral.100"
                  fontSize="25px"
                  fontWeight="500"
                >
                  Upload Files & Audio
                </Text>
                <Text color="neutral.60" fontSize="16px" fontWeight="400">
                  Docs formats: PDF, CSV, TXT or DOCX format
                </Text>
                <Text color="neutral.60" fontSize="16px" fontWeight="400">
                Audio formats: M4A, MP3, MPEG, WAV or MPGA 
                </Text>
              </Box>

              <Box
                ref={drop}
                onClick={handleClick}
                display="inline-flex"
                  p={["40px 20px", "40px 20px", "40px 40px"]}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius="10px"
                border="2px dashed"
                borderColor="primary.30"
                bg={colorMode === "dark" ? "#000000" : "#F4F4F9"}
                mt="24px"
                  width="full"
                  textAlign="center"
              >
                <Text color="neutral.50" fontSize="16px" fontWeight="400">
                  Drag & drop your file(s) here or
                </Text>
                <Text color="primary.50" fontSize="16px" fontWeight="500">
                  browse
                </Text>
                <Text color="neutral.50" fontSize="16px" fontWeight="400">
                  Upload up to 25 MB of an audio file.
                </Text>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                  style={{ display: "none" }}
                  disabled={isLoading}
                />
              </Box>
            </ModalBody>

            <ModalFooter justifyContent="center" p={0} mt="24px" pb={0}>
              <Box w="100%" display="flex" flexDir="column">
                {!!fileName && (
                  <Flex
                    w="100%"
                    borderBottom="1px solid"
                    borderColor="neutral.30"
                    alignItems="center"
                    p="16px 0"
                    justify="space-around"
                  >
                    <Flex>
                      <DocumentIcon />
                    </Flex>
                    <Flex flexGrow={1}>
                      <Text
                        ml="6px"
                        color="neutral.70"
                        fontSize="16px"
                        fontWeight="500"
                      >
                        {fileName}
                      </Text>
                    </Flex>
                    <Flex>{renderStatusIcon()}</Flex>
                  </Flex>
                )}
              </Box>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
