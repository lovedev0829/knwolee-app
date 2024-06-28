import { ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  Td,
  Text,
  Tr,
  useColorMode,
  // useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Entity } from "src/utils/types";
// import ContentModal from "src/components/Modal/ContentModal";
import LinkLogo from "src/Icons/LinkLogo";
import { SourceIcon } from "src/components/Sources/SourcesTable/IconCell";
import { CreateKnowleeAgentPayload } from "src/api/requests/knowleeAgentIndex";

const respPaddingXRow = ["0", "0", "0", "0", "4px", "32px"];
const respPaddingXRowIcon = ["8px", "8px", "8px", "8px", "16px", "32px"];
const respPaddingYRow = ["0", "0", "0", "0", "12px", "16px"];
const respPaddingXRowBtns = ["0", "0", "0", "0", "0", "16px"];
const respTitleW = ["50px", "100px", "150px", "150px", "250px", "400px"];

interface Props {
  entity: { isLocal?: boolean } & Entity;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  values: CreateKnowleeAgentPayload;
}

function AgentDataSourceRow({ entity, handleChange, values }: Props) {
  const { value, createdAt, sourceType, id: entityId, isLocal = false } = entity;
  const isChecked = values?.entityIds?.includes(entityId);
  const isDisabled = !isChecked && values?.entityIds?.length >= 20;

  // const {
  //   isOpen: isOpenContentModal,
  //   onClose: onCloseContentModal,
  //   onOpen: onOpenContentModal,
  // } = useDisclosure();

  const { colorMode } = useColorMode();

  return (
    <>
      <Tr
        height="64px"
        borderRadius="10px"
        outline="1px solid"
        outlineColor={colorMode === "dark" ? "#343839" : "neutral.20"}
        backgroundColor={colorMode === "dark" ? undefined : "neutral.10"}
        border="3px solid transparent"
        padding="16px 32px"
        overflow="hidden"
        color={colorMode === "dark" ? "neutral.10" : "neutral.100"}
      >
        <Td
          px={respPaddingXRowIcon}
          py={respPaddingYRow}
          width={["40px", "40px", "50px"]}
        >
          <Checkbox
            name="entityIds"
            value={entity.id}
            isChecked={isChecked}
            onChange={handleChange}
            isDisabled={isDisabled}
          />
        </Td>
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          width={["50px", "50px", "auto"]}
        >
          <SourceIcon sourceType={sourceType} />
        </Td>
        <Td
          textDecorationLine="underline"
          fontSize="16px"
          fontWeight="400"
          p={respPaddingXRow}
          maxW={respTitleW}
        >
          <Box display="flex" mr="10px" overflow="hidden">
            <Text isTruncated>{value}</Text>
          </Box>
        </Td>
        <Td
          fontSize="16px"
          fontWeight="400"
          maxWidth="120px"
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
        >
          <Text fontSize="14px">
            {/* {formatDistanceToNow(new Date(createdAt), { addSuffix: true })} */}
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </Text>
        </Td>
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          width="100px"
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
            {/*<Text ml="12px" fontSize="13px" fontWeight="500">
              Visit
          </Text>*/}
          </Button>
        </Td>
      </Tr>
      <Tr height="8px" />
      {/* {isOpenContentModal && (
        <ContentModal
          entity={entity}
          isOpen={isOpenContentModal}
          onClose={onCloseContentModal}
        />
      )} */}
    </>
  );
}

export default AgentDataSourceRow;
