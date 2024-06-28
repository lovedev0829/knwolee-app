import { Container, Heading, useColorMode } from "@chakra-ui/react";
import WordCloud from 'react-d3-cloud';
import { theme } from "src/theme";



/** Sample data for wordcloud */
const WCdata = [
    { text: 'Hey', value: 360 },
    { text: 'lol', value: 360 },
    { text: 'first impression', value: 360 },
    { text: 'very cool', value: 90 },
    { text: 'duck', value: 90 },
    { text: 'bitcoin', value: 360 },
    { text: 'Ether', value: 360 },
    { text: 'usdt', value: 90 },
    { text: 'bnb', value: 360 },
    { text: 'safemoon', value: 720 },
];
/** */

const Insightsummary = () => {
    const { colorMode } = useColorMode();
    return (
        <Container
            border={'solid 1px'}
            borderRadius={'10px'}
            borderColor={colorMode === 'dark' ? "#343839" : theme.colors.neutral[30]}
            padding={'5'}
        >
            <Heading
                as="h2"
                color={colorMode === 'dark' ? theme.colors.neutral[10] : theme.colors.neutral[100]}
                fontSize="20px"
                fontWeight="500"
                lineHeight="28px"
            >
                Insights Summary
            </Heading>
            <WordCloud
                data={WCdata}
                spiral={"rectangular"}
                height={430}
                fontSize={(word) => Math.log2(word.value) * 5}
                rotate={(word) => word.value % 360}
                random={Math.random}
                onWordClick={(_, d) => {
                    console.log(`onWordClick: ${d.text}`);
                }}
            />
        </Container>
    );
};

export default Insightsummary;
