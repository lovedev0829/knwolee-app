// NewOnboardingSegmentation.tsx
import React, { useState } from "react";
import StepOneModal from "./StepOne";
import StepTwoModal from "./StepTwo";
import StepThreeModal from "./StepThree";

interface NewOnboardingSegmentationProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const NewOnboardingSegmentation: React.FC<NewOnboardingSegmentationProps> = ({
  isOpen,
  onClose,
  currentStep,
  setCurrentStep,
}) => {
  const [formValues, setFormValues] = useState({
    name: "",
    role: { label: "", value: "" },
    theme: "light",
  });

  if (!isOpen) return null;

  return (
    <>
      <StepOneModal
        isOpen={isOpen && currentStep === 1}
        onClose={onClose}
        setIndexCurrentStep={setCurrentStep}
        currentStep={currentStep}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <StepTwoModal
        isOpen={isOpen && currentStep === 2}
        onClose={onClose}
        setIndexCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
      <StepThreeModal
        isOpen={isOpen && currentStep === 3}
        onClose={onClose}
        setIndexCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
    </>
  );
};

export default NewOnboardingSegmentation;
