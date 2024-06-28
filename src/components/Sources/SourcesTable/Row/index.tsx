import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useColorMode,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons"
import KnowleeLogo from "../../../../Icons/KnowleeLogo";
import LinkLogo from "../../../../Icons/LinkLogo";
import TrashIcon from "../../../../Icons/TrashIcon";
import { useRemoveEntityMutation } from "../../../../api/mutations";
import { SourceIcon } from "../IconCell";
import { format, formatDistanceToNow } from "date-fns";
import ConfirmModal from '../../../common/ConfirmModal';
import { useUserData } from '../../../../api/queries';
import SourceStatus from '../SourceStatus';
import { Entity } from 'src/utils/types';
import MenuVertical from "src/assets/images/MenuVertical.png";
import ContentModal from 'src/components/Modal/ContentModal';
import { isDoubleStepEntity } from 'src/utils/entity';
import SubEntitiesModal from 'src/components/Modal/SubEntitiesModal';
import SourceStatusBadges from '../SourceStatusBadges';


const respPaddingXRow = ["0", "0", "0", "0", "4px", "8px"];
const respPaddingXRowIcon = ["8px", "8px", "8px", "8px", "16px", "16px"];
const respPaddingYRow = ["0", "0", "0", "0", "10px", "8px"];
const respPaddingXRowBtns = ["0", "0", "0", "0", "0", "8px"];
const respTitleW= ["50px","100px","150px","150px","250px","400px"]

interface SourceProps {
  entity: { isLocal?: boolean } & Entity
}

export const Row: React.FC<SourceProps> = ({
  entity
}) => {
  const { id, sourceType, value, createdAt, userVectors = [], isScraped, subSetType, isNoData, tokens, isLocal=false } = entity;
  const isDoubleStep = isDoubleStepEntity({ sourceType, subSetType: subSetType})
  const {
    isOpen: isOpenContentModal,
    onClose: onCloseContentModal,
    onOpen: onOpenContentModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSubEntitiesModal,
    onClose: onCloseSubEntitiesModal,
    onOpen: onOpenSubEntitiesModal,
  } = useDisclosure();

  const { colorMode } = useColorMode();
  const { data: userData } = useUserData();
  const removeEntityMutation = useRemoveEntityMutation();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  if (!userData) return null;

  const handleDeleteEntity = useCallback(async () => {
    //console.log('deleting...  ')
    if (!id) return;
    const mutationPayload = { userId: userData.id, entityId: id };
    await removeEntityMutation.mutateAsync(mutationPayload);
    setConfirmModalOpen(false)
  }, [id, userData?.id]);

  const confirmDeleteEntity = useCallback(() => {
    if (!id) return;
    setConfirmModalOpen(true);
  }, [id]);

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
          <SourceStatusBadges
            userVectors={userVectors}
            isScraped={isScraped}
            sourceType={sourceType}
            subSetType={subSetType}
            isNoData={isNoData}
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
          //textDecorationLine="underline"
          fontSize="16px"
          fontWeight="400"
          p={respPaddingXRow} 
          maxW={respTitleW}
        >
          <Box display="flex" mr='10px' overflow="hidden" 
          >
            <Text isTruncated>{value}</Text>
          </Box>
        </Td>
        {/*<Td
          fontSize="16px"
          fontWeight="400"
          maxWidth="100px"
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
        >
          <Text fontSize='14px'>
              {typeof createdAt === "number"
              ? formatDistanceToNow(new Date(createdAt * 1000), { addSuffix: true })
              : formatDistanceToNow(new Date(createdAt), { addSuffix: true })
            } 
          </Text>
          </Td>*/}
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
          width="140px"
        >
          {/* Placeholder for token count */}
          <Tooltip label="100 credits ~= 75 words in English" fontSize="md">
            <span>
              <InfoOutlineIcon cursor="help" ml="2" color="primary.50" />
            </span>
          </Tooltip>
          <Text fontSize='14px' display="inline-block" ml={2}>Credits: {tokens || 0}</Text>
        </Td>  
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
          width="80px"
        >
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            onClick={isDoubleStep ? onOpenSubEntitiesModal : onOpenContentModal}
            // Should not disable button for doublestep entities
            isDisabled={isDoubleStep ? false : (isNoData)} // temp: without || !userVectors.length)}, as we can pause using pinecone
            >
            <KnowleeLogo />
            <Text
              ml="4px"
              fontSize="13px"
              fontWeight="500"
            >
              Open
            </Text>
          </Button>
        </Td>
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
          width="50px"
        >
          <Button bg='none' display="flex" alignItems="center" color="primary.50" _hover={{bg: 'none', color: "primary.80"}}
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
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["none", "none", "table-cell"]}
          width="50px"
        >
          <Button p={respPaddingXRowBtns} bg='none' _hover={{bg: 'none', color: "delete.100"}} display="flex" alignItems="center" color="delete.50"
            onClick={confirmDeleteEntity}
          >
            <TrashIcon /> 
             {/*<Text ml="12px" fontSize="13px" fontWeight="500"
            >
              Delete
            </Text>*/}
          </Button>
        </Td>
        <Td
          px={respPaddingXRow}
          py={respPaddingYRow}
          display={["table-cell", "table-cell", "none"]}
          width="40px"
          textAlign="right"
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Actions'
              variant="unstyled"
            >
              <Img src={MenuVertical} alt="menu" margin="auto" />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<KnowleeLogo width={24} height={24} />}
                onClick={onOpenContentModal}
                isDisabled={isNoData } // || !userVectors.length
              >
                Open
              </MenuItem>
              <MenuItem
                icon={<LinkLogo />}
                _hover={{ color: "primary.80" }}
                color="primary.50"
                onClick={() => window.open(`${value}`)}
                isDisabled={isLocal}
              >
                Visit
              </MenuItem>
              <MenuItem
                icon={<TrashIcon />}
                _hover={{ color: "delete.100" }}
                color="delete.50"
                onClick={confirmDeleteEntity}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <Tr height="8px" />
      <Tr display={"none"}>
        <Td>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDeleteEntity}
        title="Are you sure you want to remove this source?"
        description="Watch out! Knowlee will forget the associated knowledge."
        confirmButtonProps={{ isDisabled: removeEntityMutation.isLoading, isLoading: removeEntityMutation.isLoading }}
        />
      {isOpenContentModal && (
        <ContentModal
          entity={entity}
          isOpen={isOpenContentModal}
          onClose={onCloseContentModal}
        />
      )}
      {isOpenSubEntitiesModal && (
        <SubEntitiesModal
          entity={entity}
          isOpen={isOpenSubEntitiesModal}
          onClose={onCloseSubEntitiesModal}
        />
      )}
        </Td>
      </Tr>
    </>
  );
};
