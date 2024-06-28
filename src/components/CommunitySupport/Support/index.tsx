import { useState } from 'react';
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import KnowleeLogoBig from "../../../Icons/KnowleeLogoBig";
import SendEmailModal from '../SendEmailModal';

const textData = [
  {
    question: "How often do you add new sources to Knowlee's knowledge base?",
    answer: "We're constantly expanding our information sources. While there isn't a fixed schedule, we regularly add new credible and reliable sources to our knowledge base. This continual expansion ensures that Knowlee provides you with the most comprehensive and up-to-date responses.",
  },
  {
    question: "How do I interact with Knowlee?",
    answer: "To start using Knowlee, the first step is to add your data sources to the system. This could be a wide variety of things - documents, websites, socials, and more. Once you've done that, Knowlee will start processing and understanding the content, preparing itself to answer your questions based on these sources. Once the status is green in Active Source, you can ask Knowlee anything related to your added sources and receive immediate, accurate responses.",
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

export default function Support() {
  const { colorMode } = useColorMode();

  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const supportUrl = "https://discord.com/invite/WQHnexwswS";

  return (
    <>
      <Flex
        className="scroll-hover"
        flexDir="column"
        minH={0}
        flex="1"
        mt="24px"
        overflow="auto" >
        <Flex
          gap="24px"
          justify="center"
          color={colorMode === "dark" ? "neutral.20" : undefined}
          flexDirection={["column", "column", "row"]}>
        <Flex
          onClick={() => setEmailModalOpen(true)}
          w="100%"
          h="184px"
          borderRadius="20px"
          flexDir="column"
          justify="center"
          alignItems="center"
            bg={colorMode === "dark" ? "#343839" : "neutral.20"}
          cursor="pointer"
        >
          <FrameIcon alt="" src="/images/SendEmail.svg" />
          <SectionText>Send an email</SectionText>
        </Flex>
        <Flex
          onClick={() => window.open(supportUrl, "_blank")}
          w="100%"
          h="184px"
          borderRadius="20px"
          flexDir="column"
          justify="center"
          alignItems="center"
            bg={colorMode === "dark" ? "#343839" : "neutral.20"}
          cursor="pointer"
        >
          <FrameIcon alt="" src="/images/OpenTicket.svg" />
          <SectionText>Open a ticket</SectionText>
        </Flex>
      </Flex>

        <Accordion
          defaultIndex={[0]}
          allowMultiple
          mt={["24px", "24px", "40px"]}
        >
        {textData.map((item, i) => (
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
                    color={colorMode === "dark" ? "neutral.20" : "neutral.90"}
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

      <Flex
          mt={["24px", "24px", "48px"]}
        py="80px"
          bg={colorMode === "dark" ? "#343839" : "neutral.15"}
        justify="center"
        alignItems="center"
        flexDir="column"
        borderRadius="20px"
        mb="32px"
      >
        <Box w="112px" h="112px">
          <KnowleeLogoBig />
        </Box>
        <Box my="32px" textAlign="center">
            <Text
              fontSize="25px"
              color={colorMode === "dark" ? "neutral.20" : "neutral.90"}
              fontWeight="500"
            >
            Can’t find any answer?
          </Text>
            <Text
              fontSize="16px"
              color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
              fontWeight="400"
            >
            Let’s ask the smartest AI Chat{" "}
          </Text>
        </Box>
        <Link to={"/knowleechats"}>
          <Button
            w="158px"
            p="12px 0"
            bg="primary.50"
            color="neutral.10"
            borderRadius="10px"
            fontWeight="500"
            fontSize="16px"
          >
            Ask Knowlee
          </Button>
        </Link>
        
      </Flex>
      </Flex>
      <SendEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSubmit={console.log}
      />
    </>
  );
}
const FrameIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;
const SectionText = styled.div`
  line-height: 24px;
  font-weight: 500;
`;
