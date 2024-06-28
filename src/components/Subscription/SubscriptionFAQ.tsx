import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";


const faqList = [
    {
        question: "How often do you add new sources to Knowlee's knowledge base?",
        answer: "We're constantly expanding our information sources. While there isn't a fixed schedule, we regularly add new credible and reliable sources to our knowledge base. This continual expansion ensures that Knowlee provides you with the most comprehensive and up-to-date responses.",
    },
    {
        question: "How do I interact with Knowlee?",
        answer: "To start using Knowlee, the first step is to add your data sources to the system. This could be a wide variety of things - documents, websites, socials, and more. Once the status is green in Active Source, Knowlee will start processing and understanding the content, preparing itself to answer your questions based on these sources. After the initial setup, you can ask Knowlee anything related to your added sources and receive immediate, accurate responses.",
    },
    {
        question: "Do I need to manually add all my data sources for Knowlee to answer my queries?",
        answer: "Yes, you need to manually add your data sources. But don't worry, the process is intuitive and straightforward! After you add a data source, Knowlee will process the information and use it to answer your future queries. This unique approach allows Knowlee to provide personalized and highly relevant answers based on your specific knowledge base.",
    },
    {/*
      question: "Which version of GPT does Knowlee use?",
      answer: "The Starter plan makes use of the GPT 3.5 model, while the Pro plan is powered by the latest version of GPT for superior understanding and response generation.",
  */
        question: "What AI model powers Knowlee during its Beta stage?",
        answer: "During the Beta stage, Knowlee is powered by the latest version of the GPT model. This ensures high-quality understanding and response generation, providing you with the best AI-assisted knowledge management experience.",
    },
    {
        question: "How secure is my data with Knowlee?",
        answer: "We take data security seriously. We have implemented robust security measures to ensure your data is safe and secure. All conversations with Knowlee are encrypted to guarantee utmost privacy. While we utilize OpenAI's capabilities, only OpenAI directly receives and processes the data you provide. We do not share your data with any third parties.",
    },
    {
        question: "What if Knowlee doesn't have an answer to my question?",
        answer: "Knowlee uses sophisticated AI algorithms to provide the best possible answer. If it cannot answer your question, it means the information is currently not in its knowledge base. However, Knowlee learns continuously and updates its knowledge base regularly.",
    },
];

function SubscriptionFAQ() {
    const textColor = useColorModeValue("neutral.90", "neutral.20");
    const backgroundColor = useColorModeValue("neutral.01100", "neutral.100");

    return (
        <Flex
            padding={["24px", "24px", "24px", "20"]}
            flexDirection={"column"}
            alignItems={"center"}
            gap={["24px", "24px", "24px", "12"]}
            // borderTop={"1px solid"}
            // borderColor={"neutral.01100"}
            backgroundColor={backgroundColor}
        >
            <Text
                alignSelf={"stretch"}
                color={textColor}
                textAlign={"center"}
                fontSize={["28px", "28px", "39px"]}
                fontWeight={"700"}
                mt="24px"
            >
                Frequently asked questions
            </Text>
            <Accordion defaultIndex={[0]} allowMultiple width="full" maxWidth={"716px"}>
                {faqList.map((item, i) => (
                    <AccordionItem p="16px 0" key={i}>
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton px={0} alignItems="center">
                                    <Flex w="32px" h="32px" alignItems="center" justify="center">
                                        {isExpanded ? <MinusIcon /> : <AddIcon />}
                                    </Flex>
                                    <Box
                                        as="span"
                                        flex="1"
                                        textAlign="left"
                                        color={textColor}
                                        fontSize="16px"
                                        fontWeight="500"
                                        lineHeight="24px"
                                        ml={["12px", "12px", "32px"]}
                                    >
                                        {item.question}
                                    </Box>
                                </AccordionButton>

                                <AccordionPanel
                                    p={0}
                                    fontWeight="400"
                                    color="neutral.60"
                                    ml={["44px", "44px", "64px"]}
                                >
                                    {item.answer}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </Flex>
    )
}

export default SubscriptionFAQ