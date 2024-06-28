import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import SettingContent from './SettingContent';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
};

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="3xl">
      <ModalOverlay />
      <ModalContent borderRadius="24px">
        <ModalBody padding="48px">
          <SettingContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Settings;