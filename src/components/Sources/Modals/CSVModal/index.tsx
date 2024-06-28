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
  useColorMode,
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

const CSVModal: React.FC = () => {
  const { colorMode } = useColorMode();
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
      <ModalCloseButton color={colorMode === "dark" ? "neutral.70" : undefined} />
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
            color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
            fontSize="25px"
            fontWeight="500"
          >
            Upload Files
          </Text>
          <Text
            color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
            fontSize="16px"
            fontWeight="400"
          >
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
          borderColor={colorMode === "dark" ? "#343839" : "primary.30"}
          bg={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
          mt="24px"
        >
          <Text
            color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
            fontSize="16px"
            fontWeight="400"
          >
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
              borderColor={colorMode === "dark" ? "#343839" : "neutral.30"}
              alignItems="center"
              p='16px 0'
            >
              <DocumentIcon fill={colorMode === "dark" ? "#CACDCE" : undefined} />
              <Text
                ml='6px'
                w='50%'
                color={colorMode === "dark" ? "neutral.40" : "neutral.70"}
                fontSize="16px"
                fontWeight="500"
              >
                {file.name}
              </Text>
              <Progress
                w="130px"
                value={file.loadingPercentage}
                size="xs"
                backgroundColor={colorMode === "dark" ? "neutral.90" : "primary.10"}
                // sx={customStyles}
                sx={{
                  "& > div": {
                    bg: "primary.50",
                  },
                }}
              />

              <Text
                ml='6px'
                color={colorMode === "dark" ? "neutral.40" : "neutral.70"}
                fontSize="16px"
                fontWeight="500"
              >
                {file.loadingPercentage}%
              </Text>
              <CloseButton color={colorMode === "dark" ? "neutral.70" : undefined} />
            </Box>
          ))}
        </Box>
      </ModalFooter>
    </>
  );
};

export default CSVModal;
