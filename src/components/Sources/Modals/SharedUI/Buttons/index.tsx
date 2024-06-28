import { Button, ButtonProps, Flex, Icon, MenuButton, VisuallyHiddenInput, useColorMode, useColorModeValue } from "@chakra-ui/react";
import PlusIcon from "../../../../../Icons/PlusIcon";
import UploadIcon from "../../../../../Icons/UploadIcon";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ChangeEvent, useRef } from "react";
import { useBulkUploadEntityMutation } from "src/api/mutations";
import { downloadFile } from "src/utils/file.download";

export const SubmitButton = ({ ...props }) => {
  return (
    <Button
      w="144px"
      p="12px 0"
      bg="primary.50"
      color="neutral.10"
      borderRadius="10px"
      fontWeight="500"
      {...props}
    >
      Submit
    </Button>
  );
};

export const CancelButton = ({ ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      w="144px"
      p="12px 0"
      bg={colorMode === "dark" ? "neutral.80" : "neutral.30"}
      color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
      borderRadius="10px"
      fontWeight="500"
      {...props}
    >
      Cancel
    </Button>
  );
};

export const AddButton = (props: ButtonProps) => {
  return (
    <Button
      p={0}
      _hover={{ bg: "none", cursor: "pointer" }}
      leftIcon={<Icon as={PlusIcon} color="primary.50" />}
      fontSize="13px"
      lineHeight="20px"
      color="primary.50"
      bg="none"
      {...props}
    >
      Add
    </Button>
  );
};

export const BulkUploadButton = ({
  onClose,
  ...props
}: { onClose: () => void } & ButtonProps) => {
  const textColor = useColorModeValue("neutral.70", "neutral.60");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const bulkUploadEntityMutation = useBulkUploadEntityMutation();

  function handleBulkUploadButtonClick() {
    // Trigger the file input when the button is clicked
    fileInputRef.current?.click();
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      bulkUploadEntityMutation.mutate(formData);
      onClose();
    }
  }

  return (
    <Flex direction="column" alignItems="center">
      <Button
        p={1}
        leftIcon={<Icon as={UploadIcon} color={textColor} />}
        fontSize="13px"
        lineHeight="20px"
        height="fit-content"
        color={textColor}
        bg="none"
        onClick={handleBulkUploadButtonClick}
        {...props}
      >
        Bulk .CSV Upload
      </Button>
      <VisuallyHiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        />
          <small 
            role="button" 
            onClick={() => downloadFile('/bulk-csv-upload.csv', "bulk-csv-upload.csv")}
            style={{
              color: 'grey', // Sets the font color to grey
              fontSize: '0.7rem', // Makes the font much smaller
              fontFamily: 'inherit', // Ensures the font is the same as the rest of the application
              cursor: 'pointer', // Changes the cursor to indicate it's clickable
              alignSelf: 'flex-end', // Aligns this element to the right
              //textDecoration: 'underline'  Optionally, keep underline to indicate it's downloadable
            }}
          >
            Download template
          </small>
    </Flex>
  );
};

export const InputSelectButton: React.FC<{ subSetType: string, minW?: string, w?: string }> = ({
  subSetType,
  minW="120px",
  w="unset",
  ...props
}) => {
  const { colorMode } = useColorMode();

  return (
    <MenuButton
      w={w} 
      minW={minW || "120px"}
      as={Button}
      padding="12px 16px"
      borderLeft="1px solid"
      borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
      borderRadius={colorMode === "dark" ? "10px" : "10px"}
      bg={colorMode === "dark" ? "neutral.80" : "neutral.20"}
      fontSize="16px"
      fontWeight="500"
      lineHeight="24px"      
      color={colorMode === "dark" ? "neutral.40" : "neutral.90"}
      rightIcon={<ChevronDownIcon />}
      {...props}
    >
      {subSetType || "Select"}
    </MenuButton>
  );
};
