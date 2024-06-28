import { Box, Button, Container, Flex, Heading, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useUserKnowledgeData } from "../../../api/queries/index";
import { theme } from "src/theme";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { SOURCE_TYPES } from "src/utils/types";
import PlusIcon from "src/Icons/PlusIcon";
import { Link as RouterLink } from "react-router-dom";

/** Sample data and colors for chart */
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 300 },
    { name: 'Group F', value: 300 },
    { name: 'Group G', value: 200 },
    { name: 'Group H', value: 300 },
    { name: 'Group I', value: 300 },
    { name: 'Group L', value: 200 },
];
const COLORS = ['#4386F4', '#3FDD78', '#FFAB3F', '#FF6039', '#8A2BE2', '#FFD700', '#20B2AA', '#FF69B4', '#00BFFF', '#7FFF00', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
/** */

const Datasource = () => {
    const headingTextColor = useColorModeValue("neutral.100", "neutral.10");
    const textColor = useColorModeValue("neutral.90", "neutral.20");
    const borderColor = useColorModeValue("neutral.30", "neutral.80");
    const { colorMode } = useColorMode();
    const { data: userEntities } = useUserKnowledgeData();
    const sourceTypeArr: SOURCE_TYPES[] = [];
    userEntities?.map((iterator) => {
        if (iterator.sourceType === 'news') {
            iterator.sourceType = SOURCE_TYPES.NEWSAPI;
        }
        sourceTypeArr.push(iterator.sourceType)
    })

    const chartData = Object.values(sourceTypeArr.reduce((c: any, v: any) => {
        c[v] = c[v] || [v, 0];
        c[v][1]++;
        return c;

    }, {})).map((o: any) => ({ name: o[0], value: o[1] }));

    // Total number of active data sources.
    const getTotalCount = () => {
        if (chartData) {
            return (chartData.reduce((a, v) => a = a + v.value, 0))
        }
    }

    // Making ChartData.
    const getChartData = () => {
        if (chartData) {
            for (var i = 0; i < chartData.length; i++) {
                chartData[i].name = chartData[i].name + ' '.repeat(10) + chartData[i].value + '(' + (Math.round(chartData[i].value / chartData.reduce((a, v) => a = a + v.value, 0) * 100).toFixed(0) + '%)')
            }
        }
        return chartData
    }

    // Getting Legend names.
    const getName = (sourceType: string) => {
        switch (sourceType) {
            case 'youtube':
                return "Video"
            case 'news':
                return "News"
            case 'twitter':
                return "Social"
            case 'pdf':
                return "Docs"
            case 'coda':
                return "Coda"
            case 'medium':
                return "Medium"
            case 'application/pdf':
                return "PDF"
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return "Docx"
            case 'text/plain':
                return "TXT"
            case 'text/csv':
                return "CSV"
            case 'application/json':
                return "JSON"
            case 'url':
                return "URL"
            case 'github':
                return "GitHub"
            case 'openai':
                return "OpenAI"
            case 'gitbook':
                return "GitBook"
            case 'reddit':
                return "Reddit"
            // for audio
            case "audio/mp3":
                return "MP3"
            case "audio/mpeg":
                return "MPEG"
            case "audio/x-m4a":
                return "M4A"
            case "audio/wav":
                return "WAV"
            case "audio/mpga":
                return "MPGA"
            case "google_drive":
                return "G Drive"
            case "carbon":
                return "Carbon"
            case "one_drive":
                return "One Drive"
            case "sharepoint":
                return "SharePoint"
            default:
                return "";
        }
    }

    // Rendering Legends.
    const renderLegend = (props: any) => {
        const { payload } = props;
        if (!payload) {
            return <></>
        }
        return (
            <Flex style={{ flexDirection: "column" }}>
                {
                    payload.map((entry: Payload, index: number) => {
                        let splitStr = entry.value.split(' ');
                        let name = getName(splitStr[0]);
                        let count = splitStr[splitStr.length - 1].split('(')[0];
                        let percentage = entry.value.split('(')[1].split(')')[0];
                        return (
                            <Flex alignSelf={"flex-end"} marginLeft={'130px'} key={index}>
                                <Flex alignItems={"center"} justifyContent={"space-around"}>
                                    <Box marginRight={'16px'} width={'20px'} height={"8px"} borderRadius={'4px'} backgroundColor={entry.color} />
                                    <Text lineHeight={8} width={'60px'}>{name}</Text>
                                    <Flex width={'120px'} justifyContent={"center"}>
                                        <Text>{`${count}`}</Text>
                                        <Text whiteSpace={'pre-wrap'}> ({`${percentage}`})</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    }
                    )
                }
            </Flex>
        );
    }

    return (
        <Container
            border={'solid 1px'}
            borderRadius={'10px'}
            borderColor={colorMode === 'dark' ? "#343839" : theme.colors.neutral[30]}
            padding={'0'}
            maxWidth={'inherit'}
        >
            <Flex
                gap="8px"
                justifyContent="space-between"
                alignItems="center"
                padding="20px 20px 0 20px"
                flexWrap="wrap"
            >
                <Heading
                    as="h2"
                    color={headingTextColor}
                    fontSize="20px"
                    fontWeight="500"
                    lineHeight="28px"
                >
                    Data Sources
                </Heading>
                <Button
                    variant="outline"
                    border="2px solid"
                    borderColor={borderColor}
                    leftIcon={<PlusIcon />}
                    color={textColor}
                    fontSize="14px"
                    fontWeight="500"
                    as={RouterLink}
                    to="/knowledge-sources"
                >
                    Add a new source
                </Button>
            </Flex>
            <Flex>
                <Text
                    fontSize="31px"
                    lineHeight="56px"
                    paddingLeft={'5'}
                    display={'initial'}
                    fontWeight={500}
                    color={colorMode === 'dark' ? theme.colors.neutral[10] : theme.colors.neutral[100]}
                >
                    {getTotalCount()}
                </Text>
                <Text alignSelf={"center"} marginTop={2} whiteSpace={"pre-wrap"} color={colorMode === 'dark' ? theme.colors.neutral[50] : theme.colors.neutral[60]}>
                    {" "}active data sources
                </Text>
            </Flex>
            <Box overflow="auto">
                {
                    chartData.length > 0 ?
                        <PieChart width={460} height={275}>
                            <Legend content={renderLegend} verticalAlign="middle" />
                            <Pie
                                data={getChartData()}
                                cx={120}
                                cy={100}
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                        </PieChart>
                        :
                        <div></div>
                }
            </Box>
        </Container>
    );
};

export default Datasource;
