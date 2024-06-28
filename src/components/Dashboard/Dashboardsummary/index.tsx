import {
    Image,
    Container,
    List,
    ListItem,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    Box,
    Center,
    Link,
} from "@chakra-ui/react";
import { useDashboardsummaryData } from "../../../api/queries/index";
import { SummaryItem } from "src/types";
import MediumIcon from "../Icons/MediumIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import NewsIcon from "../Icons/NewsIcon";
import { Link as RouterLink } from "react-router-dom";

const Dashboardsummary = () => {
    const borderColor = useColorModeValue("neutral.30", "#343839");
    const descriptionTextColor = useColorModeValue("neutral.60", "neutral.50");
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const { data: dashboardsummaryData } = useDashboardsummaryData();

    function renderSummaryImage(item: SummaryItem) {
        switch (item.sourceType) {
            case "medium":
                return (
                    <Box
                        bgColor="icons.medium"
                        marginRight="10px"
                        boxSize={45}
                        minW={45}
                        borderRadius="full"
                    >
                        <Center alignItems="center" height={45}>
                            <MediumIcon fill={"white"} width="30" height="30" />
                        </Center>
                    </Box>
                );

            case "news":
                return (
                    <Box
                        bgColor="red"
                        marginRight="10px"
                        boxSize={45}
                        minW={45}
                        borderRadius="full"
                    >
                        <Center alignItems="center" height={45}>
                            <NewsIcon fill={"white"} width="45" height="45" />
                        </Center>
                    </Box>
                );

            case "youtube":
                return (
                    <Box
                        bgColor="icons.youtube"
                        marginRight="10px"
                        boxSize={45}
                        minW={45}
                        borderRadius="full"
                    >
                        <Center alignItems="center" height={45}>
                            <YoutubeIcon fill={"white"} width="30" height="30" />
                        </Center>
                    </Box>
                );
        }
        if (item.imageUrl) {
            return (
                <Image
                    borderRadius="full"
                    boxSize="40px"
                    src={item?.imageUrl}
                    alt="Dan Abramov"
                />
            );
        }
    }

    return (
        <Container
            border={"1px solid"}
            borderRadius="10px"
            borderColor={borderColor}
            padding="5"
            maxWidth="inherit"
        >
            <Heading
                as="h2"
                color={headingTextColor}
                fontSize="20px"
                fontWeight="500"
                lineHeight="28px"
            >
                Knowlee Summary
            </Heading>
            <List spacing={5} paddingTop={5}>
                {!dashboardsummaryData?.news.length && (
                    <Flex
                        alignItems="center"
                        height="full"
                        justifyContent="center"
                        minHeight="40"
                    >
                        <Text color={descriptionTextColor} textAlign="center">
                            Nothing to sum up.
                        </Text>
                    </Flex>
                )}
                {dashboardsummaryData?.news.map((item) => {
                    return (
                        <ListItem display="flex" gap={4} key={item.entityId}>
                            {renderSummaryImage(item)}
                            <Link
                                as={RouterLink}
                                to={item.url}
                                target="_blank"
                                alignSelf="center"
                                fontWeight="500"
                                fontFamily="Roboto"
                            >
                                {item?.title}
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
};

export default Dashboardsummary;
