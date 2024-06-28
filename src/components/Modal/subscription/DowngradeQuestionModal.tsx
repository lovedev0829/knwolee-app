import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalProps,
    ModalHeader,
    Flex,
    Text,
    useColorModeValue,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import KnowleeLogo from "src/Icons/KnowleeLogo";
import FirstQuestion from "./FirstQuestion";
import SecondStepDiscount from "./SecondStepDiscount";
import ThirdQuestion from "./ThirdQuestion";
import FourthStepConfirmation from "./FourthStepConfirmation";
import { useUserSetting } from "src/api/queries";
import { useBillingManagerModalStore } from "src/store";
import { useUpdateUserSettingMutation } from "src/api/mutations/userIndex";
import { DowngradeAnswers } from "src/types";

type Props = {
    upgradeSubscription: () => Promise<void>;
} & Omit<ModalProps, "children">;

const DowngradeQuestionModal = ({
    upgradeSubscription,
    isOpen,
    onClose,
    ...modalProps
}: Props) => {
    const { close: closeBillingManagerModal } = useBillingManagerModalStore();
    const modalCloseButtonColor = useColorModeValue("neutral.40", "neutral.70");
    const modalContentBgColor = useColorModeValue("#FFF", "neutral.100");
    const titleTextColor = useColorModeValue("neutral.100", "neutral.10");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState<DowngradeAnswers>({
        why: "",
        suggestion: "",
    });

    const { data: userSetting, isLoading: loadingUserSetting } = useUserSetting();

    const { mutateAsync: updateUserSetting } = useUpdateUserSettingMutation();

    const handleNext = async () => {
        if (currentPage === 4) {
            onClose();
            setCurrentPage(1);
            await upgradeSubscription();
            closeBillingManagerModal();
            if (!userSetting) return;
            await updateUserSetting({
                ...userSetting,
                downgradeAnswers: answers,
            });
            return;
        }
        if (currentPage === 1) {
            if (!loadingUserSetting && userSetting?.specialDiscountUsed) {
                // skip special discount step
                setCurrentPage(3);
                return;
            }
        }
        setCurrentPage(currentPage + 1);
    };

    const handleGoBack = () => {
        if (currentPage === 3) {
            if (!loadingUserSetting && userSetting?.specialDiscountUsed) {
                // skip special discount step
                setCurrentPage(1);
                return;
            }
        }
        setCurrentPage(currentPage - 1);
    };

    function renderModalBody() {
        switch (currentPage) {
            case 1:
                return (
                    <FirstQuestion
                        handleNext={handleNext}
                        setAnswers={setAnswers}
                        answers={answers}
                        loadingUserSetting={loadingUserSetting}
                    />
                );

            case 2:
                return (
                    <SecondStepDiscount
                        handleNext={handleNext}
                        setAnswers={setAnswers}
                        answers={answers}
                        handleGoBack={handleGoBack}
                        onClose={onClose}
                    />
                );

            case 3:
                return (
                    <ThirdQuestion
                        handleNext={handleNext}
                        setAnswers={setAnswers}
                        answers={answers}
                        handleGoBack={handleGoBack}
                        loadingUserSetting={loadingUserSetting}
                    />
                );
            case 4:
                return (
                    <FourthStepConfirmation
                        handleNext={handleNext}
                        setAnswers={setAnswers}
                        answers={answers}
                        handleGoBack={handleGoBack}
                    />
                );

            default:
                break;
        }
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setCurrentPage(1);
                onClose();
            }}
            size="xl"
            {...modalProps}
        >
            <ModalOverlay bg={modalOverlayBgColor} />
            <ModalContent bg={modalContentBgColor}>
                <ModalCloseButton color={modalCloseButtonColor} zIndex="docked" />
                <ModalHeader>
                    <Flex justify={"center"} gap={3}>
                        <KnowleeLogo />
                        <Text color={titleTextColor}>Knowlee</Text>
                    </Flex>
                </ModalHeader>
                {renderModalBody()}
            </ModalContent>
        </Modal>
    );
};

export default DowngradeQuestionModal;
