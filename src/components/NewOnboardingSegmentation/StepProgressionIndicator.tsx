import React from 'react';
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';

interface StepIndicatorProps {
    currentStep: number;
    setIndexCurrentStep: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, setIndexCurrentStep }) => {
    const { colorMode } = useColorMode();
    const bg = colorMode === 'dark' ? '#1E1F20' : '#F4F8FF';

    return (
        <Flex justify="center" align="center" bg={bg} borderRadius="100px" padding={"8px"}>
            {[1, 2, 3].map((step) => (
                <Box
                    key={step}
                    m={2}
                    w={7}
                    h={7}
                    borderRadius="full"
                    bg={currentStep === step ? 'blue.600' : 'blue.200'}
                    cursor="pointer"
                    display="flex"
                    gap={"8px"}
                    margin={"0 4px"}
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => setIndexCurrentStep(step)}
                >
                    <Text color="white" fontWeight="bold" fontSize={"16px"} margin={"0"}>
                        {step}
                    </Text>
                </Box>
            ))}
        </Flex>
    );
};

export default StepIndicator;
