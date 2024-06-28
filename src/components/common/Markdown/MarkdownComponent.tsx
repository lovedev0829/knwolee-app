import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Box, Text, useColorModeValue, Link, useDisclosure, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import he from 'he'; // Import he for HTML entity decoding
import { useInView } from 'react-intersection-observer';
import EnlargeImageModal from 'src/components/Modal/EnlargeImageModal';
import CodeBlock from './CodeBlock';

interface Props {
    children: React.ReactNode;
}

interface LazyImageProps {
    src?: string;
    alt?: string;
    title?: string;
    onClick?: () => void;
}

function extractHtmlBlock(content: string): string[] {
    const htmlBlockPattern = /'''html([^]*?)'''/g;
    // const htmlBlockPattern = /'''html'''/g;
    const matches = content.match(htmlBlockPattern);
    if (matches) {
        return matches.map(match => match.replace(/'''html|'''/g, '').trim());
    }
    return [];
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, title, onClick }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Load the image only once
        threshold: 0.1, // Trigger when 10% of the image is in view
    });

    const decodedSrc = he.decode(src ?? '');

    return (
        <div ref={ref} style={{ minHeight: '200px', minWidth: '200px' }}>
            {inView && (
                <Image
                    src={decodedSrc}
                    alt={alt}
                    title={title}
                    style={{
                        borderRadius: '12px',
                        width: '100%', // Make the image responsive
                        height: 'auto', // Maintain aspect ratio
                    }}
                    cursor="pointer"
                    onClick={onClick}
                />
            )}
        </div>
    );
};

const MarkdownComponent: React.FC<Props> = ({ children }) => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const borderColor = useColorModeValue("gray.200", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const htmlBgColor = useColorModeValue("white", "gray.800");
    const htmlTextColor = useColorModeValue("black", "white");

    const {
        isOpen: isOpenEnlargeImage,
        onOpen: onOpenEnlargeImage,
        onClose: onCloseEnlargeImage,
    } = useDisclosure();

    const content = children as string;
    const htmlBlocks = extractHtmlBlock(content);
    const markdownWithoutHtml = content.replace(/'''html([^]*?)'''/g, '');
    // const markdownWithoutHtml = content;

    return (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    img: ({ src, alt, title }) => {
                        return (
                            <>
                                <LazyImage
                                    src={src}
                                    alt={alt}
                                    title={title}
                                    onClick={onOpenEnlargeImage}
                                />
                                <EnlargeImageModal
                                    isOpen={isOpenEnlargeImage}
                                    onClose={onCloseEnlargeImage}
                                    src={he.decode(src ?? '')}
                                />
                            </>
                        );
                    },
                    h1: ({ ...props }) => (
                        <Text fontSize="2xl" fontWeight="bold" mt={4} mb={2} {...props} />
                    ),
                    h2: ({ ...props }) => (
                        <Text fontSize="xl" fontWeight="semibold" mt={4} mb={2} {...props} />
                    ),
                    h3: ({ ...props }) => (
                        <Text fontSize="lg" fontWeight="medium" mt={4} mb={2} {...props} />
                    ),
                    p: ({ ...props }) => <Text {...props} mb={4} />,
                    a: ({ href, ...props }) => (
                        <Link
                            color="blue.500"
                            textDecoration="underline"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        />
                    ),
                    ol: ({ ...props }) => <Box as="ol" mt={3} pl={5} {...props} />,
                    ul: ({ ...props }) => <Box as="ul" mt={3} pl={5} {...props} />,
                    li: ({ ...props }) => (
                        <Box as="li" mt={1} pl={2} {...props} display="flex" alignItems="flex-start">
                            <Text as="span" mr={2} mt="0.5em">&#8226;</Text>
                            <Box as="span" flex="1">{props.children}</Box>
                        </Box>
                    ),
                    blockquote: ({ ...props }) => (
                        <Box
                            as="blockquote"
                            borderLeft="4px solid"
                            borderColor={borderColor}
                            pl={4}
                            mt={4}
                            fontStyle="italic"
                            {...props}
                        />
                    ),
                    // pre: ({ ...props }) => (
                    //     <Box
                    //         as="pre"
                    //         p={4}
                    //         mt={4}
                    //         borderRadius="md"
                    //         bg={bgColor}
                    //         whiteSpace={'pre-wrap'}
                    //         overflow="auto" // Ensure preformatted text is scrollable
                    //         {...props}
                    //     />
                    // ),
                    code: ({ ...props }) => (
                        <CodeBlock>{props.children}</CodeBlock>
                    ),
                    em: ({ ...props }) => (
                        <Text as="em" fontStyle="italic" {...props} />
                    ),
                    strong: ({ ...props }) => (
                        <Text as="strong" fontWeight="bold" {...props} />
                    ),
                    hr: ({ ...props }) => (
                        <Box
                            as="hr"
                            mt={6}
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            {...props}
                        />
                    ),
                    table: ({ ...props }) => (
                        <Table variant="simple" mt={4} {...props} />
                    ),
                    th: ({ ...props }) => (
                        <Th border="1px solid" borderColor={borderColor} p={2} bg={bgColor} {...props} />
                    ),
                    td: ({ ...props }) => (
                        <Td border="1px solid" borderColor={borderColor} p={2} {...props} />
                    ),
                }}
            >
                {markdownWithoutHtml}
            </ReactMarkdown>
            {htmlBlocks.map((html, index) => (
                <Box
                    key={index}
                    width="100%"
                    overflow="hidden"
                    whiteSpace="normal"
                    wordBreak="break-word" // Ensure long words break to avoid overflow
                    bg={htmlBgColor} // Set background color based on color mode
                    color={htmlTextColor} // Set text color based on color mode
                    p={4} // Add padding for better readability
                    borderRadius="8px" // Add border radius for better aesthetics
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            ))}
        </>
    );
};

export default MarkdownComponent;
