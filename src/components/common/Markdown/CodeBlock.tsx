// src/components/CodeBlock.tsx
import React from 'react';
import { Box, Button, useColorModeValue, useToast } from '@chakra-ui/react';

interface CodeBlockProps {
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const toast = useToast();
    const codeString = children?.toString() ?? "";

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast({
            title: "Copied successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            as="pre"
            bg={bgColor}
            color={textColor}
            p={4}
            borderRadius="8px"
            position="relative"
            whiteSpace="pre-wrap"
            wordBreak="break-all"
        >
            <code>{children}</code>
            <Button
                size="sm"
                position="absolute"
                top={2}
                right={2}
                onClick={() => copyToClipboard(codeString)}
            >
                Copy
            </Button>
        </Box>
    );
};

export default CodeBlock;
