import { Button, Flex, InputGroup, VisuallyHidden } from "@chakra-ui/react";
import React, { ChangeEvent, ReactNode, useRef } from "react";

const ChatFileUpload: React.FC<{
  onChange: (e: FileList) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  children: ReactNode;
  isDisabled: boolean;
  multiple?: boolean;
  accept?: string
}> = ({ onChange, inputRef, children, isDisabled, multiple = false, accept = "", ...rest }) => {

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && onChange) {
      onChange(files);
    }
  };

  return (
    <InputGroup {...rest} w="auto" p={0}>
      <Button
        bg="none"
        _hover={{ bg: "none" }}
        m={0}
        padding={0}
        minW={0}
        minH={0}
        onClick={handleButtonClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
      <Flex align="center" justify="center">
        <VisuallyHidden
          as="input"
          type="file"
          accept={accept}
          ref={inputRef}
          onChange={handleInputChange}
          multiple={multiple}
        />
      </Flex>
    </InputGroup>
  );
};

export default ChatFileUpload;
