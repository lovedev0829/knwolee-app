import { List, ListItem, Heading, Box, Center, useColorModeValue, Text, Flex } from "@chakra-ui/react";
import { useDashboardrecentData } from "../../../api/queries/index";
import { theme } from "src/theme";
import TwitterIcon from "../Icons/TwitterIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import MediumIcon from "../Icons/MediumIcon";

const Recentactivity = () => {
    const { data: recentData } = useDashboardrecentData();
    const borderColor = useColorModeValue("neutral.30", "#343839");
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const descriptionTextColor = useColorModeValue("neutral.60", "neutral.50");


    // Getting Image metadata.
    const getImageSource = (sourceType: string) => {
        let img = { component: '', bgColor: '' }
        switch (sourceType) {
            case 'youtube':
                return {
                    component: <YoutubeIcon fill={"white"} width="30" height="30" />,
                    bgColor: 'red'
                }
            case 'medium':
                return {
                    component: <MediumIcon fill={"white"} width="30" height="30" />,
                    bgColor: 'black'
                }
            case 'twitter':
                return {
                    component: <TwitterIcon fill={"white"} width="30" height="30" />,
                    bgColor: theme.colors.twitter[500],
                }
            case 'news':
                return {
                    component: <MediumIcon fill={"white"} width="30" height="30" />,
                    bgColor: 'blue'
                }
            case 'url':
                return {
                    component: <MediumIcon fill={"white"} width="30" height="30" />,
                    bgColor: 'green'
                }
            default:
                return img;
        }
    }

    // Render List
    const renderList = () => {
        if (!recentData?.length) {
            return (
                <Flex alignItems="center" height="full" justifyContent="center">
                    <Text color={descriptionTextColor} textAlign="center">
                        No activities yet!
                    </Text>
                </Flex>
            );
        }
        return (
            <List spacing={5} paddingTop={'5'}>
                {
                    recentData?.map((item: any, index) => {
                        ////console.log('item => ', item)
                        if (index === 1) {
                            item.sourceType = 'twitter';
                        }
                        let imageMeta = getImageSource(item.sourceType);
                        return (
                            <ListItem key={item.id} display={'flex'} onClick={() => window.open(item.value, "_blank")}>
                                <Box bgColor={imageMeta.bgColor} marginRight={'10px'} boxSize={45} minW={45} borderRadius={"full"}>
                                    <Center alignItems={"center"} height={45}>
                                        {imageMeta.component}
                                    </Center>
                                </Box>
                                <p style={{ alignSelf: 'center' }}>{`Knowlee has learned from ${item.sourceType}`}</p>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
    return (
        <Box
            border={'solid 1px'}
            borderRadius={'10px'}
            borderColor={borderColor}
            padding={'5'}
            width="full"
        >
            <Heading
                as="h2"
                color={headingTextColor}
                fontSize="20px"
                fontWeight="500"
                lineHeight="28px"
            >
                Recent Activity
            </Heading>
            {renderList()}
        </Box >
    );
};

export default Recentactivity;
