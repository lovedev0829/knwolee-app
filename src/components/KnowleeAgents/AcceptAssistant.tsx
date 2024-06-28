import { 
    Container,
    VStack,
    Text,
    Box,
    ButtonGroup,
    Button
} from '@chakra-ui/react'

import { useLocation, useNavigate } from "react-router-dom";
import { 
    useHandleAssistantMutation
} from "src/api/mutations/knowleeAgentIndex";
import { useUserData } from "src/api/queries";

const bgStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#343541",
    color: "#eee",
    position: "absolute"
}
function AcceptAssistant() {

    const navigate = useNavigate();
    const location = useLocation();
    const { data: userData } = useUserData();

    const { mutateAsync: shareAssistant } = useHandleAssistantMutation();

    const handleShareAssistant = () =>{
        const queryParams = new URLSearchParams(location.search);
        const assistantToken = queryParams.get("token") || "";
        const userId = userData?.id || "";
        shareAssistant({assistantToken, userId});
   }
 
  return (
    <Container maxW='full' sx={bgStyle} bg='blue.600' color='white' centerContent={true}>
      <VStack>
        <Text>Do you want to get the following assistant? YES / NO</Text>
        <Box
            display='flex'
            justifyContent='center'
            width='100%'
            py={12}
            bgRepeat='no-repeat'
            mb={2}
        >
            <ButtonGroup gap='4'>
                <Button colorScheme='green' onClick={handleShareAssistant}>Accept</Button>
                <Button colorScheme='red' onClick={()=> navigate('/')}>Decline</Button>
            </ButtonGroup>
        </Box>
      </VStack>

    </Container>
  );
}

export default AcceptAssistant;
