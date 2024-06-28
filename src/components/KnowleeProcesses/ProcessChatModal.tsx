import {
    Box,
    Flex,
    Grid,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import MessageBox from "../Chat/AgentChat/MessageBox";
import { UserProcess } from "src/types/userProcess.interface";
import {
    useRetrieveUserProcess,
    useUserProcessThreadMessages,
    useUserProcessThreadRuns,
} from "src/api/queries/knowleeProcessQuery";
import MessageIcon from "src/Icons/MessageIcon";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

type Props = {
    userProcess: UserProcess;
} & Omit<ModalProps, "children">;

function ProcessChatModal({ userProcess, ...modalProps }: Props) {
    const { _id: userProcessId } = userProcess;
    const [selectedThreadId, setSelectedThreadId] = useState("");

    const hoverBackgroundColor = useColorModeValue("gray.100", undefined);
    const iconFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
    const textColor = useColorModeValue("neutral.100", "neutral.10");
    const activeBackgroundColor = useColorModeValue("neutral.20", "neutral.80");

    const { threadIds } = userProcess;
    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { data: userProcessDetails } = useRetrieveUserProcess(userProcessId);
    const { data: threadMessages } =
        useUserProcessThreadMessages(selectedThreadId);

    const { data: threadRuns } = useUserProcessThreadRuns(selectedThreadId);

    const chatTokens = useMemo(() => {
        if (!threadRuns) return 0;
        return threadRuns.reduce((prev, curr) => {
            if (curr.usage) {
                return prev + curr.usage.total_tokens;
            }
            return prev;
        }, 0);
    }, [threadRuns]);

    useEffect(() => {
        const firstThreadId = threadIds?.[0];
        if (firstThreadId) {
            setSelectedThreadId(firstThreadId);
        }
    }, [threadIds]);

    return (
        <>
            <Modal size="6xl" scrollBehavior="inside" {...modalProps}>
                <ModalOverlay bg={modalOverlayBgColor} />
                <ModalContent bg={modalContnetBgColor} borderRadius="24px">
                    <ModalHeader>AI Processes Run History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody borderRadius="24px" padding={["24px"]}>
                        <Grid templateColumns="repeat(12, 1fr)" gap={2} height={"70vh"}>
                            <GridItem w="100%" colSpan={9} overflow={"auto"} height={"full"}>
                                {threadMessages?.map((message, index) => {
                                    return <MessageBox key={index} message={message} />;
                                })}
                            </GridItem>
                            <GridItem w="100%" colSpan={3} overflow={"auto"} height={"full"}>
                                <Flex flexDirection={"column"} height={"full"}>
                                    <Box pb={1}>
                                        <Text fontSize="14px" display="inline-block" ml={2}>
                                            Process Credits: {new Intl.NumberFormat().format(chatTokens)}
                                        </Text>
                                    </Box>
                                    <Box height={"full"} overflow={"auto"}>
                                        {userProcessDetails?.threads.map(({ created_at, id }) => {
                                            return (
                                                <Flex
                                                    gap={1}
                                                    alignItems={"center"}
                                                    justifyContent={"space-between"}
                                                    cursor="pointer"
                                                    _hover={{
                                                        cursor: "pointer",
                                                        backgroundColor: hoverBackgroundColor,
                                                    }}
                                                    px={2}
                                                    py={1}
                                                    rounded={"md"}
                                                    onClick={() => {
                                                        setSelectedThreadId(id);
                                                    }}
                                                    backgroundColor={
                                                        id === selectedThreadId
                                                            ? activeBackgroundColor
                                                            : "unset"
                                                    }
                                                    key={id}
                                                >
                                                    <Flex alignItems={"center"} gap={1} maxW={"80%"}>
                                                        <Box>
                                                            <MessageIcon
                                                                width={20}
                                                                height={20}
                                                                fill={iconFillColor}
                                                            />
                                                        </Box>
                                                        <Box maxW={"90%"}>
                                                            <Text noOfLines={1} color={textColor}>
                                                                {format(
                                                                    new Date(created_at * 1000),
                                                                    "yyyy-MM-dd HH:mm:ss"
                                                                )}
                                                            </Text>
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                            );
                                        })}
                                    </Box>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProcessChatModal;
