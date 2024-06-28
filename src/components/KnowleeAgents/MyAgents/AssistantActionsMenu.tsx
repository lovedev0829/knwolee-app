import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    useDisclosure,
    Badge
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PencilIcon from "src/Icons/PencilIcon";
import SettingsIcon from "src/Icons/SettingsIcon";
import TrashIcon from "src/Icons/TrashIcon";
import { useDeleteAssistantMutation, useShareAssistantMutation } from "src/api/mutations/knowleeAgentIndex";
import ConfirmModal from "src/components/common/ConfirmModal";
import AgentShareIcon from "src/Icons/AgentShareIcon";
import { useUserData } from "src/api/queries";

interface Props {
    assistantId: string;
    isDefaultAgentAdded: boolean;
}

function AssistantActionsMenu({ assistantId, isDefaultAgentAdded }: Props) {
    const navigate = useNavigate();
    const {
        isOpen: isOpenConfirmModal,
        onClose: onCloseConfirmModal,
        onOpen: onOpenConfirmModal,
    } = useDisclosure();

    const pathFillColor = useColorModeValue("#0C0D0D", "#FEFEFE");
    const selectColorMode =  useColorModeValue("white", "#232627");
    const selectHoverColorMode =  useColorModeValue("#E2E8F0", "#474a4b");
    const { data: userData } = useUserData();
    const userId = userData?.id || "";

    const { mutateAsync: deleteAssistant, isLoading } = useDeleteAssistantMutation();
    const { mutateAsync: shareAssistant } = useShareAssistantMutation();

    function handleEditClick() {
        navigate(`/knowlee-assistants/assistants/${assistantId}`);
    }

    async function handleDeleteAgent() {
        await deleteAssistant(assistantId);
        onCloseConfirmModal();
    }

    async function handleShareAssistant (){
        await shareAssistant({assistantId, userId})
    }

    return (
        <>
                    
            <Menu >
                <MenuButton
                    as={IconButton}
                    aria-label="Actions"
                    variant="unstyled"
                    minWidth="20px"
                >
                    <SettingsIcon pathFill={pathFillColor} />
                </MenuButton>
                <MenuList
                bg={selectColorMode}
                >
                    <MenuItem  _hover={{  bg:selectHoverColorMode }} bg={selectColorMode} icon={<AgentShareIcon />} onClick={handleShareAssistant}>
                        Share
                        {isDefaultAgentAdded && (
                            <Badge
                                ml="2"
                                colorScheme="yellow"
                            >
                                Knowlee Assistant
                            </Badge>
                        )}
                    </MenuItem>
                    <MenuItem  _hover={{  bg:selectHoverColorMode }} bg={selectColorMode} icon={<PencilIcon />} onClick={handleEditClick}>
                        Edit
                        {isDefaultAgentAdded && (
                            <Badge
                                ml="2"
                                colorScheme="yellow"
                            >
                                Knowlee Assistant
                            </Badge>
                        )}
                    </MenuItem>
                    <MenuItem
                        bg={selectColorMode}
                        icon={<TrashIcon />}
                        _hover={{ color: "delete.100", bg:selectHoverColorMode }}
                        color="delete.50"
                        onClick={onOpenConfirmModal}
                    >
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu >
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                onClose={onCloseConfirmModal}
                onConfirm={handleDeleteAgent}
                title="Are you sure you want to delete this Assistant?"
                description="Assistant will be permanently deleted."
                confirmButtonProps={{ colorScheme: "red", isDisabled: isLoading, isLoading: isLoading }}
            />
        </>
    );
}

export default AssistantActionsMenu;