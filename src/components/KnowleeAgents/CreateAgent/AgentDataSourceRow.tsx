import { ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  Text,
  Flex,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Entity } from "src/utils/types";
// import ContentModal from "src/components/Modal/ContentModal";
import LinkLogo from "src/Icons/LinkLogo";
import { SourceIcon } from "src/components/Sources/SourcesTable/IconCell";
import { CreateKnowleeAgentPayload } from "src/api/requests/knowleeAgentIndex";

const respPaddingXRow = ["0", "0", "0", "0", "4px", "32px"];
const respPaddingYRow = ["0", "0", "0", "0", "12px", "16px"];
const respPaddingXRowBtns = ["0", "0", "0", "0", "0", "16px"];

interface Props {
  entity: { isLocal?: boolean } & Entity;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  values: CreateKnowleeAgentPayload;
}

function AgentDataSourceRow({ entity, handleChange, values }: Props) {
  const { value, createdAt, sourceType, id: entityId, isLocal = false } = entity;
  const isChecked = values?.entityIds?.includes(entityId);
  const isDisabled = !isChecked && values?.entityIds?.length >= 20;

  const borderColor = useColorModeValue("neutral.30", "neutral.80");

  const { colorMode } = useColorMode();

  return (
      <Flex
        height="64px"
        borderRadius="10px"
        maxWidth={["100%", "100%", "976px"]}
        outlineColor={colorMode === "dark" ? "#343839" : "neutral.20"}
        backgroundColor={colorMode === "dark" ? undefined : "neutral.10"}
        border="1px solid"
        borderColor={borderColor}
        flexDirection="row"
        alignItems="center"
        color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
      >
        <Box
          marginLeft={30}
          width={["40px", "40px", "50px"]}
        >
          <Checkbox
            name="entityIds"
            value={entity.id}
            isChecked={isChecked}
            onChange={handleChange}
            isDisabled={isDisabled}
          />
        </Box>
        <Box
          px={respPaddingXRow}
          py={respPaddingYRow}
          width={["50px", "50px", "150px"]}
        >
          <SourceIcon sourceType={sourceType} />
        </Box>
        <Box
          textDecorationLine="underline"
          fontSize="16px"
          fontWeight="400"
          p={respPaddingXRow}
          flex={4}
          width={["50px", "50px", "auto"]}
        >
          <Box mr="10px" overflow="hidden">
            <Text isTruncated>{value}</Text>
          </Box>
        </Box>
        <Box
          fontSize="16px"
          fontWeight="400"
          display={["none", "none", "table-cell"]}
        >
          <Text fontSize="14px">
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </Text>
        </Box>
        <Box
          py={respPaddingYRow}
        >
          <Button
            bg="none"
            display="flex"
            alignItems="center"
            color="primary.50"
            _hover={{ bg: "none", color: "primary.80" }}
            p={respPaddingXRowBtns}
            onClick={() => window.open(`${value}`)}
            isDisabled={isLocal}
          >
            <LinkLogo />
          </Button>
        </Box>
      </Flex>
  );
}

export default AgentDataSourceRow;
