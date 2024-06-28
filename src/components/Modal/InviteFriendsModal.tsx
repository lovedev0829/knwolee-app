import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Button,
    useColorModeValue,
    Stat, StatLabel, StatNumber, StatGroup, FormControl, FormLabel, Input, useColorMode, useToast
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useUserData } from "../../api/queries";
import { Description } from '../Sources/Modals/SharedUI/Text';
import { MODALS_DESCRIPTIONS } from '../Sources/Modals';
import { useFormik } from 'formik';
import { useSendUserReferralEmailMutation } from 'src/api/mutations/userReferralIndex';
import { UseUserReferralInvite } from 'src/api/queries/userReferralQuery';

interface InviteFriendsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteFriendsModal = ({ isOpen, onClose }: InviteFriendsModalProps) => {
    const modalCloseButtonColor = useColorModeValue("neutral.40", "neutral.70");
    const modalContnetBgColor = useColorModeValue("#FFF", "neutral.100");
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const subHeadingTextColor = useColorModeValue("neutral.60", "neutral.50");
    const buttonBgColor = useColorModeValue("primary.60", "primary.50");
    const inputBgColor = useColorModeValue("#F9F9FA", "neutral.90");
    const inputBorderColor = useColorModeValue("neutral.30", "neutral.80");
    const inputTextColor = useColorModeValue("neutral.100", "neutral.20");


    const { data: userData } = useUserData();

    const formControlStyle = {
        mt: "24px",
    }
    interface FormError {
        email: string;
    }
    interface SendEmailPayload {
        email: string;
    }

    const { data: getUserReferralInvitee } = UseUserReferralInvite();

    const validateFormValues = (values: SendEmailPayload): FormError => {
        return {
            email: values.email ? '' : 'Email is required!',
        };
    }

    const [formError, setFormError] = useState<FormError>({
        email: ''
    });

    const sendUserReferralEmailMutation = useSendUserReferralEmailMutation();

    const formik = useFormik<SendEmailPayload>({
        initialValues: { email: '' },
        onSubmit: (values) => {
            const formErrorNew = validateFormValues(values);
            setFormError(formErrorNew);
            const formHasError = formErrorNew.email;
            if (formHasError) return;

            sendUserReferralEmailMutation.mutate(values);
            onClose();
        }
    });
    const { colorMode } = useColorMode();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormError(validateFormValues({
            ...formik.values,
            [e.target.name]: e.target.value,
        }));
        formik.handleChange(e);
    }, [formError, formik]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                p="12"
                display="inline-flex"
                flexDirection="column"
                alignItems="flex-start"
                borderRadius="24px"
                bg={modalContnetBgColor}
            >
                <ModalHeader
                    fontSize="25px"
                    fontWeight="500"
                    lineHeight="32px"
                    color={headingTextColor}
                    p="0"
                >
                    Invite Friends
                </ModalHeader>
                <ModalCloseButton color={modalCloseButtonColor} />
                <ModalBody p="0" mt="3" width="full">
                    <Description text={MODALS_DESCRIPTIONS.REFERRAL} />
                    <StatGroup>
                        <Stat>
                            <StatLabel color={subHeadingTextColor}>Emails Sent</StatLabel>
                            <StatNumber color={headingTextColor}>{getUserReferralInvitee?.totalInvites || 0}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color={subHeadingTextColor}>Users Referred</StatLabel>
                            <StatNumber color={headingTextColor}>{getUserReferralInvitee?.signedUpInvites || 0}</StatNumber>
                        </Stat>
                    </StatGroup>
                    <form onSubmit={formik.handleSubmit}>
                        <Flex gap="3">
                            <FormControl {...formControlStyle} isInvalid={!!formError.email}>
                                <FormLabel
                                    color={colorMode === "dark" ? "neutral.50" : "neutral.60"}
                                    fontSize="16px"
                                    fontWeight="400"
                                >Up to 5 invites per day</FormLabel>
                                <Input
                                    name="email"
                                    value={formik.values?.email}
                                    bg={inputBgColor}
                                    borderColor={inputBorderColor}
                                    color={inputTextColor}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                bg={buttonBgColor}
                                borderRadius="10px"
                                colorScheme="blue"
                                color="neutral.10"
                                fontSize="16px"
                                fontFamily="Roboto"
                                fontWeight="500"
                                lineHeight="24px"
                                mt="auto"
                                width="144px"
                                height="45px"
                                isDisabled={sendUserReferralEmailMutation.isLoading}
                                isLoading={sendUserReferralEmailMutation.isLoading}
                            >Send Email</Button>

                        </Flex>
                    </form>
                </ModalBody>
                <ModalFooter
                    p="0"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    gap="3"
                    mt="10"
                >
                    <Text
                        color={headingTextColor}
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="24px"
                    >
                        Share on socials
                    </Text>
                    <Flex alignItems="flex-start" gap="3">
                    {userData && (
                        <>
                            <TwitterShareButton
                                url={`I'm loving Knowlee! Sign up with my link and we both get exclusive rewards! 🎁 https://knowlee.ai/${userData.refCode || ""}`}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={`https://knowlee.ai/${userData.refCode || ""}`}
                            >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>

                            <TelegramShareButton
                                url={`I'm loving Knowlee! Sign up with my link and we both get exclusive rewards! 🎁 https://knowlee.ai/${userData.refCode || ""}`}
                            >
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>

                            <WhatsappShareButton
                                url={`I'm loving Knowlee! Sign up with my link and we both get exclusive rewards! 🎁 https://knowlee.ai/${userData.refCode || ""}`}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </>
                    )}
                </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default InviteFriendsModal;
