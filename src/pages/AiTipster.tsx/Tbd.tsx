import PageContainer from "src/components/PageContainer"
import { Flex, Text, Stack, Box } from "@chakra-ui/react"
import AiTipseterCreationTabs from "src/components/AiTipster/AiTipsterCreationTabs"

function Tbd(){
    return (
       <PageContainer
        title={
            <Flex alignItems="center">
            <Text mr={2}>AI Tipster</Text>
            </Flex>
        }
       >
        <AiTipseterCreationTabs/>
        <Stack gap={8} mt={5}>
            <Box>
            <Text color="neutral.60" fontWeight="500">
                        New Features Coming soon....
            </Text>
            </Box>
        </Stack>
       </PageContainer>
    )
}

export default Tbd