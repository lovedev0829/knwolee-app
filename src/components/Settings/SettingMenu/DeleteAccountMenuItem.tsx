import React from "react";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import DeleteAccountIcon from "../Icons/DeleteAccountIcon";
import ConfirmModal from "src/components/common/ConfirmModal";
import { useDeleteUserAccountMutation } from "src/api/mutations/userIndex";
import { useAuth0 } from "@auth0/auth0-react";

export const DeleteAccountMenuItem: React.FC = () => {
  const {
    isOpen: isOpenConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen: onOpenConfirmModal,
  } = useDisclosure();
  const { logout } = useAuth0();

  const deleteUserAccountMutation = useDeleteUserAccountMutation();

  async function handleDeleteAccount() {
    await deleteUserAccountMutation.mutateAsync();
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  return (
    <>
      <Button
        onClick={onOpenConfirmModal}
        leftIcon={<DeleteAccountIcon />}
        colorScheme="blue"
        width={["full", "full", "140px", "212px"]}
        height="40px"
        justifyContent="flex-start"
        fontSize="13px"
        color="#6C7275"
        lineHeight="20px"
        fontWeight="500"
        alignItems="center"
        borderRadius="48px"
        bg="transparent"
        _hover={{
          bg: "neutral.30",
        }}
        _active={{
          bg: "transparent",
        }}
      >
        <Text
          color="#D84C10"
          fontFamily="Roboto"
          fontSize="13px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="20px"
        >
          Delete Account
        </Text>
      </Button>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
        onConfirm={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
        description="Please note: all your data sources, assistants, processes and other information will be deleted and lost forever."
        confirmButtonProps={{ isDisabled: deleteUserAccountMutation.isLoading, isLoading: deleteUserAccountMutation.isLoading }}
      />
    </>
  );
};
