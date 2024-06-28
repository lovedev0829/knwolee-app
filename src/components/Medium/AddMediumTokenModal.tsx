import { Link, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, ModalProps, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import TitleWithIcon from '../Sources/Modals/SharedUI/TitleWithIcon';
import MediumIcon from 'src/Icons/MediumIcon';
import { Description } from '../Sources/Modals/SharedUI/Text';
import { useMediumAddAccessTokenMutation } from 'src/api/mutations/mediumIndex';
import { useThirdPartyConfig } from 'src/api/queries/thirdPartyQuery';

type Props = Omit<ModalProps, 'children'>
const MODAL_DESCRIPTION = `Check your Medium Account and go to your settings page's Integration tokens in the Security tab to generate your token. Copy that token and paste it below.`

function AddMediumTokenModal({ onClose, ...modalProps }: Props) {
    const modalContentBgColor = useColorModeValue("white", "neutral.100");
    const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const { data: thirdPartyConfig, isLoading: thirdPartyConfigLoading } =
    useThirdPartyConfig();

    const [accessToken, setAccessToken] = useState<string | undefined>(thirdPartyConfig?.medium?.token?.access_token);

    const { mutateAsync, isLoading } = useMediumAddAccessTokenMutation();

    const handleAddMediumAccessToken = () => {
        mutateAsync({ accessToken });
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
                        title="Medium"
                        icon={<MediumIcon />}
                        iconColor="icons.medium"
                    />
                    <Description text={MODAL_DESCRIPTION} />
                    <Link href="https://medium.com/me/settings/security" isExternal color="blue.400">
                        To get a token: click here, scroll down and click on "Integration Tokens"
                    </Link>

                    <Input
                        placeholder="Enter access token"
                        mt={4}
                        mb={4}
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                </ModalBody>

                <ModalFooter justifyContent="center" gap={6}>
                    <Button
                        fontWeight="500"
                        color="neutral.10"
                        bg="primary.50"
                        _hover={{}}
                        minWidth="144px"
                        onClick={handleAddMediumAccessToken}
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

export default AddMediumTokenModal