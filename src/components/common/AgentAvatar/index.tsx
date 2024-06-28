import React, { useState } from 'react';
import {
  Grid,
  ModalOverlay,
  Modal,
  useColorModeValue,
  Input,
  ModalHeader,
  ModalBody,
  IconButton,
  ModalContent,
  ModalCloseButton,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import * as AiIcons from 'react-icons/ai';
import { IconType } from 'react-icons/lib';


// Define type for the props
interface AgentAvatarModalProps {
  isOpen: boolean;
  openAvatarModal: () => void;
  handleChageAiAvatar: (icon: JSX.Element, color: string) => void;
}

const AgentAvatarModal: React.FC<AgentAvatarModalProps> = ({
  isOpen,
  openAvatarModal,
  handleChageAiAvatar,
}) => {

  const [searchValue, setSearchValue] = useState<string>('');
  // Assuming that Object.entries(AiIcons) returns an array of tuples, where each tuple has two string elements.
  const iconComponents: [string, IconType][] = Object.entries(AiIcons);
  const [avatarColor, setAvatarColor] = useState<string>('#4386F4');
  
  // Filter icons based on search input
  const filteredIcons = iconComponents.filter(([iconName]) =>
    iconName.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  const colorThemes: string[] = ['#4386F4', '#FFAB3F', '#F61C0D', '#7289DA', '#FFFFFF', '#000000'];
  const colorButtonStyle = {
    size: 'md',
    width: "50px",
    height: "50px",
    borderRadius: 50,
  };
  const borderColor = useColorModeValue("neutral.30", "neutral.80");

  // The color parameter should be typed as string since the colors in the array are strings
  const colorChange = (color: string) => {
    setAvatarColor(color);
  };

  return (
    <Modal isOpen={isOpen} onClose={openAvatarModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize='md'>Select color and icon</Text>
          <Stack mt={2} direction="row" gap={5}>
            {colorThemes.map((item, index) => (
              <Button  
                key={index} // Add a key for items generated from map
                justifyContent="normal"
                leftIcon={avatarColor === item ? <CheckIcon /> : undefined}
                size={colorButtonStyle.size}
                height={colorButtonStyle.height}
                borderRadius={colorButtonStyle.borderRadius}
                width={colorButtonStyle.width}
                style={{ backgroundColor: item, color: '#ffffff' }} // Adjust text color as needed

                onClick={() => colorChange(item)}
              />
            ))}
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            borderRadius="12px"
            maxWidth={["100%", "100%", "560px"]}
            border="2px solid"
            borderColor={borderColor}
            padding={3}
            placeholder="Search for an icon..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width="full"
            name="name"
            required={true}
            marginTop="0"
          />
          <Grid templateColumns='repeat(5, 1fr)' gap={3} mt={2} 
                sx={{width: "400px", height: "300px", overflow: "auto"}}>
                {filteredIcons.map(([iconName, IconComponent], index) => (
                    <IconButton
                      key={`icon-btn-${index}`}
                      w={5}
                      isRound={true}
                      aria-label='Search database'
                      icon={<IconComponent title={iconName} size="30" color={avatarColor} />}
                      onClick={() => handleChageAiAvatar(<IconComponent color={avatarColor} size={50}/>, avatarColor)}
                    />
                ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AgentAvatarModal;
