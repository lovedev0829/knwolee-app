import { Link, Button, Input, Modal, ModalBody, ModalCloseButton, Text, ModalContent, ModalFooter, ModalOverlay, ModalProps, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import TitleWithIcon from '../Sources/Modals/SharedUI/TitleWithIcon';
import DiscordIcon from 'src/Icons/DiscordIcon';
import { Description } from '../Sources/Modals/SharedUI/Text';
import { useDiscordAddAccessTokenMutation } from 'src/api/mutations/discordIndex';
import { useThirdPartyConfig } from 'src/api/queries/thirdPartyQuery';

type Props = Omit<ModalProps, 'children'>
const MODAL_DESCRIPTION = `Open the Discord Developer Portal and change settings to your application. Go under "Bot" tab and click on "Reset Token". Copy that token and paste it below.`

function AddDiscordTokenModal({ onClose, ...modalProps }: Props) {
    const modalContentBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
        useThirdPartyConfig();

    const [accessToken, setAccessToken] = useState<string | undefined>(thirdPartyConfig?.discord?.token?.access_token);
    const [discordServer, setDiscordServer] = useState<string | undefined>(thirdPartyConfig?.discord?.serverId);
    
    const { mutateAsync, isLoading } = useDiscordAddAccessTokenMutation();

    const handleAddDiscordAccessToken = () => {
        mutateAsync({ accessToken, serverId: discordServer });
        // setAccessToken(""); 
        onClose();
    }
    return (
        <Modal size="3xl" scrollBehavior="inside" onClose={onClose} {...modalProps}>
            <ModalOverlay bg={modalOverlayBgColor} />
            <ModalContent
                bg={modalContentBgColor}
                padding="40px 20px 30px 32px"
                borderRadius={24}
                height="auto"
            // overflow="auto"
            >

                <ModalBody p={0}>
                    <TitleWithIcon
                        title="Discord"
                        icon={<DiscordIcon />}
                        iconColor="trasparent"
                    />
                    <Description text={MODAL_DESCRIPTION} />
                    <Link href="https://discord.com/developers/applications" isExternal color="blue.400">
                        To get a token: click here, go to your app's settings and click on "Reset Token" under "Bot" tab.
                    </Link>

                    <Input
                        placeholder="Enter Bot token"
                        mt={4}
                        mb={4}
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                    <Text color="green.400">
                        Copy the Discord Server ID and paste it below. Right click on the server's icon, then "Copy Server ID".
                    </Text>
                    <Input
                        placeholder="Enter Discord Server ID"
                        mt={4}
                        mb={4}
                        value={discordServer}
                        onChange={(e) => setDiscordServer(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter justifyContent="center" gap={6}>
                    <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        _hover={{}}
                        minWidth="144px"
                        onClick={handleAddDiscordAccessToken}
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

export default AddDiscordTokenModal