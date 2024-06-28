import {
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
  Flex,
  Text,
  Button,
  ModalFooter,
  ModalBody,
  // useToast,
  Spinner,
  TableContainer,
  Table,
  Tbody,
  ModalHeader,
} from "@chakra-ui/react";
import { Entity } from "src/utils/types";
import { Row } from "../Sources/SourcesTable/DoubleStepRow";
import { SourceIcon } from "../Sources/SourcesTable/IconCell";
import { useGetSubEntities } from "src/api/queries/entityQuery";

interface CreatedContentModalProps {
  entity: Entity;
  isOpen: boolean;
  onClose: () => void;
}

function SubEntitiesModal({
  entity,
  isOpen,
  onClose,
}: CreatedContentModalProps) {
  const { sourceType, subSetType, value } = entity;

  const modalContnetBgColor = useColorModeValue("white", "neutral.100");
  const modalHeaderColor = useColorModeValue("neutral.90", "neutral.10");
  const modalOverlayBgColor = useColorModeValue(
    undefined,
    "rgba(35, 38, 39, 0.90)"
  );

  const { isLoading, data: subEntities } = useGetSubEntities(entity.id);

  function renderContentModalBody() {
    if (isLoading) {
      return (
        <Flex alignItems="center" justifyContent="center" height="100%"> 
          <Spinner speed="0.8s" color="primary.50" />
        </Flex>
      );
    }
    if (!subEntities) {
      return <Flex alignItems="center" justifyContent="center" height="100%"> 
                <Text textAlign="center">
                    There's nothing here
                </Text>
            </Flex>;
    }
    return (
      <TableContainer w="100%" overflowX="unset" overflowY="unset">
        <Table variant="simple">
          <Tbody overflow="auto">
            {subEntities &&
              subEntities?.map((entity) => (
                <Row key={entity.id} entity={entity} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay bg={modalOverlayBgColor} />
      <ModalContent
        bg={modalContnetBgColor}
        padding="40px 20px 30px 32px"
        borderRadius={24}
        height="full"
      >
        <ModalHeader
          padding={0}
          color={modalHeaderColor}
          fontSize="20px"
          fontWeight="700"
          lineHeight="34px"
          display="flex"
          mb="2"
          justifyContent="space-between"
        >
          <p >{value}</p>

          <Text textTransform="capitalize" display="flex" fontSize="xl" gap="1">
            <SourceIcon sourceType={sourceType} /> {`${subSetType || ""}`}
          </Text>
        </ModalHeader>
        <ModalBody padding={0}>{renderContentModalBody()}</ModalBody>
        <ModalFooter justifyContent="center" gap={6}>
          <Button onClick={onClose} fontWeight="500" minWidth="144px">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SubEntitiesModal;
