/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Box,
  Button,
  CloseButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Progress,
  SystemStyleObject,
  Text,
  useStyleConfig,
  useTheme
} from "@chakra-ui/react";
import CloudIcon from "../../../../Icons/CloudIcon";
import DocumentIcon from "../../../../Icons/DocumentIcon";
import { Theme } from "../../../../theme";

const mockFilesUpload = [
  {
    name: "design-1.pdf",
    loadingPercentage: 75,
  },
  {
    name: "text about house.png",
    loadingPercentage: 94,
  },
  {
    name: "indent size.jpg",
    loadingPercentage: 9,
  },
];

const DocModal: React.FC = () => {
  const theme = useTheme() as Theme;

  const progressStyles = useStyleConfig("Progress", {
    colorScheme: "blue",
  })

  // TODO: find a way to customize colors

  const customStyles: SystemStyleObject = {
    ...progressStyles,
    "track": {
      ...(progressStyles as any)["track"],
      bg: theme.colors.primary[10],
    },
    "filledTrack": {
      ...(progressStyles as any)["filledTrack"],
      bg: theme.colors.primary[50],
    },
  };

  return (
    <>
      <ModalCloseButton />
      <ModalBody p={0}>
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <CloudIcon />
          <Text mt="16px" color="neutral.100" fontSize="25px" fontWeight="500">
            Upload Files
          </Text>
          <Text color="neutral.60" fontSize="16px" fontWeight="400">
            Files must be in PDF, DOCX, TXT or CSV format
          </Text>
        </Box>

        <Box
          display="inline-flex"
          p="40px 100px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          border="2px dashed"
          borderColor="primary.30"
          bg="#F9F9FA"
          mt="24px"
        >
          <Text color="neutral.50" fontSize="16px" fontWeight="400">
            Drag & drop your file(s) here or
          </Text>
          <Button
            _hover={{ bg: "none" }}
            bg="none"
            color="primary.50"
            fontSize="16px"
            fontWeight="500"
          >
            browse
          </Button>
        </Box>
      </ModalBody>

      <ModalFooter justifyContent="center" p={0} mt="24px" pb={0}>
        <Box w="100%" display="flex" flexDir="column">
          {mockFilesUpload.map((file) => (
            <Box
              w="100%"
              display="flex"
              borderBottom="1px solid"
              borderColor="neutral.30"
              alignItems="center"
              p='16px 0'
            >
              <DocumentIcon />
              <Text ml='6px' w='50%' color="neutral.70" fontSize="16px" fontWeight="500">
                {file.name}
              </Text>
              <Progress
                w="130px"
                value={file.loadingPercentage}
                size="xs"
                backgroundColor="primary.10"
                sx={customStyles}
              />

              <Text ml='6px' color="neutral.70" fontSize="16px" fontWeight="500">
                {file.loadingPercentage}%
              </Text>
              <CloseButton />
            </Box>
          ))}
        </Box>
      </ModalFooter>
    </>
  );
};

export default DocModal;
