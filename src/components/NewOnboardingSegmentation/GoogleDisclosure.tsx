import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  Link,
} from '@chakra-ui/react';

interface GoogleDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleDisclosureModal: React.FC<GoogleDisclosureModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"24px"}>
        <ModalHeader>Google disclosure</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Knowlee use and transfer of information received from Google APIs to any other app will adhere to{' '}
            <u><Link href="https://developers.google.com/terms/api-services-user-data-policy" isExternal>
              Google API Services User Data Policy
            </Link></u>
            , including the Limited Use requirements. For more information on how we use your data, see paragraph 3 in
            our{' '}
            <u><Link href="https://www.knowlee.ai/privacy.html" isExternal>
              Privacy Notice
            </Link></u>
            .
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} borderRadius={"24px"}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoogleDisclosureModal;
