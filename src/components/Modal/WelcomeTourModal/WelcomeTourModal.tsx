import { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalProps,
    useColorModeValue,
} from "@chakra-ui/react";
import WelcomeBody from "./WelcomeBody";
import TourBody from "./TourBody";
import { useUpdateProfileMutation } from "src/api/mutations/userIndex";

export interface TourItem {
    description: string;
    iframeSrc: string;
    title: string;
}

const tourList = [
    {
        description:
            "Here, view summaries from recent knowledge sources, Knowlee's tweets, and statistics on your data inputs. Everything you need, all in one glance.",
        iframeSrc: "https://www.youtube.com/embed/wdQq2Sa28mc/",
        title: "Dashboard - Your Daily Digest!",
    },
    {
        description:
            "This is where Knowlee grows smarter. Add social media feeds, documents, or news outlets, and watch as Knowlee assimilates this information to serve you better.",
        iframeSrc: "https://www.youtube.com/embed/0HQ-kkd9RsU/",
        title: "Feed the Brain - Curate Your Sources",
    },
    {
        description:
            "Engage with Knowlee directly. Convert text to various formats, upload documents for insights, or even use speech-to-text. Let the conversation lead your discovery.",
        iframeSrc: "https://www.youtube.com/embed/u2Yl2sLfukk/",
        title: "Knowlee Chat - Interact and Discover",
    },
    {
        description:
            "Find links to our social media, browse FAQs, or contact our team for any assistance. You're part of the Knowlee family, and we're always here to help.",
        iframeSrc: "https://www.youtube.com/embed/TDh48SYZegE/",
        title: "Community & Support - We're Here For You",
    },
    {
        description:
            "Adjust your preferences, manage communication settings, and customize Knowlee's features to best suit your needs.",
        iframeSrc: "https://www.youtube.com/embed/O_q-w8BLp-Y/",
        title: "Settings - Make Knowlee Truly Yours",
    },
];

type Props = Omit<ModalProps, "children">;

function WelcomeTourModal({ isOpen, onClose }: Props) {
    const modalContnetBgColor = useColorModeValue("white", "neutral.100");
    const modalOverlayBgColor = useColorModeValue(
        undefined,
        "rgba(35, 38, 39, 0.90)"
    );

    const [currentIndex, setCurrentIndex] = useState(-1);
    const isLastStep = currentIndex === tourList.length - 1;

    const updateProfileMutation = useUpdateProfileMutation();

    function handleNext() {
        if (isLastStep) {
            onClose();
            setCurrentIndex(-1);

            // update user welcomeTourCompleted to true
            const formData = new FormData();
            formData.append("welcomeTourCompleted", String(true));
            updateProfileMutation.mutate(formData);
            return;
        }
        setCurrentIndex((prev) => prev + 1);
    }

    function handlePrevious() {
        if (currentIndex === -1) {
            return;
        }
        setCurrentIndex((prev) => prev - 1);
    }

    function renderModalBody() {
        if (currentIndex === -1) {
            return <WelcomeBody onClose={onClose} handleNext={handleNext} />;
        }
        return (
            <TourBody
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                tourData={tourList[currentIndex]}
                onClose={onClose}
                key={currentIndex}
                isLastStep={isLastStep}
            />
        );
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay bg={modalOverlayBgColor} />
                <ModalContent bg={modalContnetBgColor} borderRadius="24px">
                    <ModalBody borderRadius="24px" padding={["24px", "48px"]}>
                        {renderModalBody()}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WelcomeTourModal;
