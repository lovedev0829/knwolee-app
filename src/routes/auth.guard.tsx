import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Box, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import axios from "axios";
import { getToken } from "../api/queries";

export const AuthenticationGuard: React.FC<{ component: React.ComponentType }> = ({ component: Component }) => {
  const AuthComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        {/* Add page loader */}
        {/* <div>Is Loading</div> */}
        <Spinner color='primary.50' size='xl'/>
      </Box>
    ),
  });

  const { getAccessTokenSilently, getAccessTokenWithPopup, isLoading, error } = useAuth0();
  // get token
  getToken(
    getAccessTokenSilently,
    getAccessTokenWithPopup
  ).then(token => {
    if (!token) return
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }).catch(error => {
    console.error(error)
  })

  if (error) {
    // Enhanced error handling
    return (
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication Error</ModalHeader>
          <ModalBody mb="12px">
            {error.message}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner color="primary.50" size="xl" />
      </Box>
    );
  }

  return <AuthComponent />;
};