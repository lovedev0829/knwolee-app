import { Box, ColorMode, useColorMode } from "@chakra-ui/react";
// import DotFlashing from './DotFlashing';

import styled, { keyframes } from "styled-components";

const dotFlashingAnimation = keyframes`
  0% {
    background-color: #4386F4;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
`;

const dotFlashingAnimationDark = keyframes`
  0% {
    background-color: #FEFEFE;
  }
  50%, 100% {
    background-color:rgba(254, 254, 254, 0.1);
  }
`;

const DotFlashingComponent = styled.div<{ colorMode: ColorMode }>`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  animation: ${({ colorMode }) =>
    colorMode === "dark"
      ? dotFlashingAnimationDark
      : dotFlashingAnimation} 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ colorMode }) => (colorMode === "dark" ? "#FEFEFE" : "#4386F4")};
    animation: ${({ colorMode }) =>
    colorMode === "dark"
      ? dotFlashingAnimationDark
      : dotFlashingAnimation} 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ colorMode }) => (colorMode === "dark" ? "#FEFEFE" : "#4386F4")};
    animation: ${({ colorMode }) =>
    colorMode === "dark"
      ? dotFlashingAnimationDark
      : dotFlashingAnimation} 1s infinite alternate;
    animation-delay: 1s;
  }
`;

export default function AIPendingBubble() {
  const { colorMode } = useColorMode();

  return (
    <Box justifyContent={'flex-start'}>
      <Box
        alignItems={'center'}
        bg={colorMode === "dark" ? "neutral.100" : '#E7EFFE'}
        textColor={'black'}
        rounded={'2xl'}
        px={4}
        pl={8}
        py={4}
        maxW={'67%'}
        overflowWrap={'anywhere'}
        minHeight={"16"}
      >
        {/* <DotFlashing /> */}
        <DotFlashingComponent colorMode={colorMode} />
      </Box>
    </Box>
  )
}