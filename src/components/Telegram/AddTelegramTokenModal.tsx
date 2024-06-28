import { Link, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, ModalProps, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TitleWithIcon from '../Sources/Modals/SharedUI/TitleWithIcon';
import TelegramIcon from 'src/Icons/TelegramIcon';
import { Description } from '../Sources/Modals/SharedUI/Text';
import { useTelegramAddAccessTokenMutation } from 'src/api/mutations/telegramIndex';
import { useThirdPartyConfig } from 'src/api/queries/thirdPartyQuery';
import { Select } from 'chakra-react-select';
import { useFilteredUserAgents } from 'src/api/queries/knowleeAgentQuery';

type Props = Omit<ModalProps, 'children'>
const MODAL_DESCRIPTION = `Connect your AI Assistant to your Telegram Bot. Add the Bot access token: chat with @BotFather, run /mybots command, select the bot and click "API Token".`

function AddTelegramTokenModal({ onClose, ...modalProps }: Props) {
    const toast = useToast();
    const modalContentBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
        useThirdPartyConfig();
    const { data: userAgents, isLoading: userAgentsIsLoading } =
        useFilteredUserAgents();

    const [accessToken, setAccessToken] = useState<string | undefined>(thirdPartyConfig?.telegram?.token?.access_token);
    const [selectedAssistant, setSelectedAssistant] = useState<{ value: string, label: string } | null>();

    const { mutateAsync, isLoading } = useTelegramAddAccessTokenMutation();

    const handleAddTelegramAccessToken = async () => {
        if(!accessToken){
            toast({
                title: "An error occurred.",
                description: "Please enter a access token",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if(!selectedAssistant?.value){
            toast({
                title: "An error occurred.",
                description: "Please select an assistant with Telegram tools",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        await mutateAsync({ accessToken, assistant_id: selectedAssistant.value });
        // setAccessToken(""); 
        onClose();
    }

    useEffect(() => {
        if (thirdPartyConfig?.telegram?.assistant_id && userAgents) {
            userAgents?.forEach((agent) => {
                if (agent.assistant.id === thirdPartyConfig?.telegram?.assistant_id) {
                    setSelectedAssistant({
                        value: agent.assistant.id,
                        label: agent.assistant.name || "",
                    });
                }
            });
        }
    }, [thirdPartyConfig?.telegram?.assistant_id, userAgents]);

    return (
        <Modal size="3xl" scrollBehavior="inside" onClose={onClose} {...modalProps}>
            <ModalOverlay bg={modalOverlayBgColor} />
            <ModalContent
                bg={modalContentBgColor}
                padding="40px 20px 30px 32px"
                borderRadius={24}
                // minHeight="400px"
                height="auto"
            // overflow="auto"
            >

                <ModalBody p={0}>
                    <TitleWithIcon
                        title="Telegram"
                        icon={<TelegramIcon />}
                        iconColor="icons.telegram"
                    />
                    <Description text={MODAL_DESCRIPTION} />
                    <Link href="https://t.me/@BotFather" isExternal color="blue.400">
                        Request the access token from @BotFather and paste it below.
                    </Link>
                    <Input
                        placeholder="Enter access token"
                        mt={4}
                        mb={4}
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                    <Select
                        placeholder="Select an assistant with Telegram tools"
                        options={userAgents?.map(agent => ({ value: agent.assistant.id, label: agent.assistant.name || "" }))}
                        onChange={setSelectedAssistant}
                        menuPosition="fixed"
                        value={selectedAssistant}
                        isLoading={userAgentsIsLoading}
                    />
                </ModalBody>

                <ModalFooter justifyContent="center" gap={6}>
                    <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        _hover={{}}
                        minWidth="144px"
                        onClick={handleAddTelegramAccessToken}
                        isLoading={isLoading}
                    >
                        Submit
                    </Button>
                    <Button onClick={onClose} fontWeight="500" minWidth="144px">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddTelegramTokenModal