import { Box, Button, Flex, Heading, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import MobileMenuIcon from "src/Icons/MobileMenuIcon";
import MobileMenuDrawer from "./MobileMenuDrawer";


interface PageContainerProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const borderBottom = useColorModeValue("1px solid #E8ECEF", "1px solid #343839");
  const HeadingColor = useColorModeValue("neutral.100", "neutral.10");

  return (
    <Box w={"100%"} h={"100%"} >
      <Box
        w={"100%"}
        borderBottom={borderBottom}
        p={["12px", "12px", "22px 40px 22px 40px"]}
        boxSizing="border-box"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
        >
        <Heading
          as="h2"
          color={HeadingColor}
          fontSize="20px"
          fontWeight="500"
          lineHeight="28px"
        >
          {title}
        </Heading>
          <Flex justifyContent="flex-end" display={["flex", "flex", "none"]}>
            <Button variant="unstyled" onClick={onOpen} display="flex" justifyContent="end">
              <MobileMenuIcon />
            </Button>
            <MobileMenuDrawer isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Flex>

      </Box>
      <Flex
        flexDir='column'
        // h={["calc(100% - 95px)", "calc(100% - 95px)", "calc(100% - 72px)"]}
        h="calc(100% - 72px)"
        p={["12px", "12px", "22px 40px 22px 40px"]}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default PageContainer;
