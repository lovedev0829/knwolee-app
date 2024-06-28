import {
    Flex,
    Img,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import type { TutorialItem } from "src/types/tutorial.interface";

interface Props {
    tutorial: TutorialItem;
}
function TutorialItem({ tutorial }: Props) {
    const headingColor = useColorModeValue("neutral.100", "neutral.10");
    const borderColor = useColorModeValue("neutral.03100", "neutral.05100");

    const iframeHeight = useBreakpointValue(["218px", "400px"]);

    return (
        <Flex
            padding={["32px 0px", "64px 0px", "64px 0px"]}
            flexDirection={["column", "column", "row"]}
            alignItems={["center", "center", "flex-start"]}
            gap={["40px", "40px", "80px"]}
            alignSelf={"stretch"}
            borderTop={"1px solid"}
            borderColor={borderColor}
        >
            <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                gap={"20px"}
                alignSelf={["stretch", "stretch", "unset"]}
                minWidth={["auto", "auto", "216px"]}
            >
                <Flex
                    width={"60px"}
                    height={"60px"}
                    padding={"18px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    rounded={"full"}
                    backgroundColor={"rgba(216, 76, 16, 0.10)"}
                >
                    <Img
                        src={tutorial.icon}
                        width={"24px"}
                        height={"24px"}
                        flexShrink={0}
                        alt={tutorial.title}
                    />
                </Flex>
                <Text
                    alignSelf={"stretch"}
                    fontSize={"24px"}
                    fontWeight={"600"}
                    lineHeight={"40px"}
                    color={headingColor}
                >
                    {tutorial.title}
                </Text>
            </Flex>

            <Flex
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"32px"}
                alignSelf={"stretch"}
                width={"full"}
            >
                {/* for iframe using dangerouslySetInnerHTML */}
                {/* {tutorial.youTubeVideo && (
                    <Box
                        height={iframeHeight}
                        width={"100%"}
                        alignSelf={"stretch"}
                        borderRadius={"13px"}
                        dangerouslySetInnerHTML={{ __html: tutorial.youTubeVideo }}
                    />
                )} */}

                {/* for iframe using src property */}
                {tutorial.iframeSrc && (
                    <iframe
                        height={iframeHeight}
                        width={"100%"}
                        src={tutorial.iframeSrc}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                )}

                {tutorial.description && (
                    <Text
                        alignSelf={"stretch"}
                        color={"neutral.60"}
                        fontSize={"16px"}
                        fontWeight={"500"}
                    >
                        {tutorial.description}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
}

export default TutorialItem;
