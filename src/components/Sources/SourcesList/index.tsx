import { Flex, Input, Text, useColorMode, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import SeatchIcon from "../../../Icons/SeatchIcon";
import ComingSoonCard from "../ComingSoonCard";
import RequestCard from "../RequestCard";
import SourceCard from "../SourceCard";
import { sourceList, SOURCE_TYPE } from './mockup';
import FileUploadSourceCard from "../FileUpload/FileUploadSourceCard";

// export type SourceType = keyof typeof SOURCE_TYPE;
export type SourceType = typeof SOURCE_TYPE[keyof typeof SOURCE_TYPE];

export default function SourcesList({
  hideLockedSources,
}: {
  hideLockedSources: boolean;
}) {
  const { colorMode } = useColorMode();
  const filteredSourceList = hideLockedSources
    ? sourceList.filter((source) => !source.isLocked)
    : sourceList;

  return (
    <Flex flexDir='column' minH={0} flex="1"  >
      {/*<Flex
        mt="24px"
        alignItems="center"
        w="100%"
        padding="6px 16px"
        align-items="center"
        gap="12px"
        borderRadius="10px"
        bg={colorMode === "dark" ? "neutral.90" : "neutral.20"}
      >
        <SeatchIcon />
        <Input
          _focus={{
            boxShadow: "none",
            borderColor: "initial",
          }}
          p="0"
          lineHeight="normal"
          fontSize="16px"
          boxSizing="content-box"
          border={0}
          outline={0}
          placeholder="Search by Name"
        />
      </Flex>*/}

      <Text
        color={colorMode === "dark" ? "neutral.40" : "neutral.60"}
        fontSize="16px"
        fontWeight="500"
        lineHeight="24px"
        mt="24px"
      >
        Suggested Sources
        <Tooltip
          label={
            <div>
              <Text fontWeight="normal" fontSize="sm">Upload docs, audios, or add the available sources.</Text>
            </div>
          }
        >
          <span>
            <InfoIcon boxSize="12px" ml={2} />
          </span>
        </Tooltip>
      </Text>

      <Flex
        className="scroll-hover"
        mt="24px"
        alignItems="flex-start"
        flexWrap="wrap"
        gap="14px"
        overflowY="auto"
      >
        <FileUploadSourceCard />
        {filteredSourceList.map((sourceItem) => (
          <SourceCard key={sourceItem.title} {...sourceItem} />
        ))}
        <RequestCard />
        <ComingSoonCard />
      </Flex>
    </Flex>
  );
}

export * from "./mockup";
