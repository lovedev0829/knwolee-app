import { InfoIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    // Input,
    // Spinner,
    Stack,
    Text,
    useColorModeValue,
    Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoTradingMarginIcon from "src/Icons/CryptoTradingMarginIcon";
// import UploadIcon from "src/Icons/UploadIcon";
import { useGenerateKpiMutation } from "src/api/mutations/kpiIndex";
import { useUpdateProfileMutation } from "src/api/mutations/userIndex";
import { useUserData } from "src/api/queries";
import InsightCreationTabs from "src/components/InsightCreation/InsightCreationTabs";
// import InsightItem from "src/components/InsightCreation/InsightGenerator/InsightItem";
import PageContainer from "src/components/PageContainer";
import { InsightFormat } from "src/types/insightCreation.interface";

const initialCheckedFormats: {
    [key: string]: boolean;
} = {
    bitcoin: false,
    ethereum: false,
    perpetuals: false,
    lending: false,
    zkrollup: false,
    toplayer1: false,
    majorlayer1: false,
    minorlayer1: false,
    layer2: false,
    interop: false,
    stablecoin: false,
};

function InsightGenerator() {

    const navigate = useNavigate();

    const textColor = useColorModeValue("neutral.100", "neutral.10");
    // const borderColor = useColorModeValue("neutral.30", "neutral.80");
    // const [insightText, setInsightText] = useState("");
    const [checkedFormats, setCheckedFormats] = useState(initialCheckedFormats);

    // const isFormatSelected = Object.values(checkedFormats).some(Boolean);

    const updateProfileMutation = useUpdateProfileMutation();
    const { data: userData } = useUserData();

    const generateKpiMutation = useGenerateKpiMutation();
    const isButtonDisabled = generateKpiMutation.isLoading;

    // function resetStates() {
    //     setInsightText("");
    //     setCheckedFormats(initialCheckedFormats);
    // }

    function getFormatsArray() {
        return Object.keys(checkedFormats).filter(
            (key) => checkedFormats[key as InsightFormat] === true
        ) as InsightFormat[];
    }

    async function handleSaveCryptoInsightInterest() {
        const insightInterests = getFormatsArray();
        const formData = new FormData();
        if (!insightInterests.length) {
            // reset interest
            formData.append("cryptoInsightInterests[]", "");
        }
        insightInterests.forEach((interest) =>
            formData.append("cryptoInsightInterests[]", interest)
        );
        await updateProfileMutation.mutateAsync(formData);
        navigate({
            pathname: "/insight-creation/created-insight",
        });
    }

    function handleFormatChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCheckedFormats((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    }

    useEffect(() => {
        if (userData?.cryptoInsightInterests?.length) {
            const insightInterests: { [key: string]: boolean } = {};
            userData.cryptoInsightInterests.forEach(interest => {
                insightInterests[interest] = true;
            })
            setCheckedFormats(insightInterests);
        }

    }, [userData])

    return (
        <PageContainer 
        title={
            <Flex alignItems="center">
            <Text mr={2}>Insight Creator</Text>
            <Tooltip label="Select the assets and save your interests. We will provide you several insights based on your selection. Check what each category contains." fontSize="sm">
                <span>
                <InfoIcon boxSize="16px" />
                </span>
            </Tooltip>
            </Flex>
        }
        >
            <InsightCreationTabs />
            <Stack gap={8} mt={5} overflow="auto" className="scroll-hover">
                {/*<Box>
                    <Text color="neutral.60" fontWeight="500">
                        Generate an Insight
                    </Text>
                    <Flex
                        gap={[2, 4, 8]}
                        alignItems={["unset", "unset", "center"]}
                        mt={4}
                        flexDirection={["column", "column", "row"]}
                        flexWrap="wrap"
                    >
                        <Flex
                            alignItems="center"
                            padding={3}
                            gap={3}
                            alignSelf="stretch"
                            borderRadius="12px"
                            border="2px solid"
                            borderColor={borderColor}
                            // background="neutral.10"
                            width={"100%"}
                            maxWidth={["100%", "100%", "450px"]}
                            maxHeight={40}
                        >
                            <Input
                                border="none"
                                padding={2}
                                focusBorderColor="transparent"
                                placeholder="Enter the insights and we'll generate ideas for you."
                                maxLength={40}
                                value={insightText}
                                onChange={(e) => setInsightText(e.target.value)}
                            />
                            <Button
                                bg="primary.50"
                                _hover={{}}
                                color="neutral.10"
                                borderRadius={"12px"}
                                p={2}
                                onClick={handleGenerateAInsightClick}
                                isDisabled={isButtonDisabled || !insightText.trim().length}
                            >
                                <ArrowUpIcon fontSize={"md"} boxSize={"6"} />
                            </Button>
                        </Flex>
                        <Text color="neutral.60" textAlign="center">OR</Text>
                        <Button
                            leftIcon={<UploadIcon />}
                            bg="primary.50"
                            color="neutral.10"
                            _hover={{}}
                            onClick={handleGenerateIdeasClick}
                            fontWeight="500"
                            isDisabled={isButtonDisabled}
                            flexWrap="wrap"
                            whiteSpace="pre-wrap"
                            height="auto"
                            py={2}
                        >
                            Generate ideas from my active sources
                        </Button>
                    </Flex>
                </Box>*/}
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        What are the main areas of your interest?
                    </Text>
                    <CheckboxGroup>
                        <Flex
                            gap={4}
                            mt={4}
                            color={textColor}
                            fontSize="15px"
                            flexWrap="wrap"
                        >
                            <Checkbox
                                name="bitcoin"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.bitcoin}
                            >
                                Bitcoin
                            </Checkbox>
                            <Checkbox
                                name="ethereum"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.ethereum}
                            >
                                Ethereum
                            </Checkbox>
                            <Checkbox
                                name="perpetuals"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.perpetuals}
                            >
                                Perpetuals{' '}
                                <Tooltip label="dYdX, Vertex, GMX, Perpetual Protocol, Mux, Rabbit-X, Drift, Synthetix, Level-Finance, Hyperliquid, Gains Network"  fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            <Checkbox
                                name="lending"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.lending}
                            >
                                Lending{' '}
                                <Tooltip label="Aave, Compound, Venus" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            {/*<Checkbox
                                name="zkrollup"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.zkrollup}
                            >
                                ZK-Rollup{' '}
                                <Tooltip label="ZKsync, Starknet, Polygon ZK, Scroll, Linea" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            <Checkbox
                                name="interop"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.interop}
                            >
                                Interoperability{' '}
                                <Tooltip label="Polkadot, Cosmoshub, Axelar, Osmosis" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>*/}
                            <Checkbox
                                name="toplayer1"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.toplayer1}
                            >
                                Top Layer 1{' '}
                                <Tooltip label="Solana, BSC, Cardano, Tron" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            {/*<Checkbox
                                name="majorlayer1"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.majorlayer1}
                            >
                                Major Layer 1{' '}
                                <Tooltip label="Near, MultiversX, Avalanche, Aptos" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            <Checkbox
                                name="minorlayer1"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.minorlayer1}
                            >
                                Minor Layer 1{' '}
                                <Tooltip label="Gnosis, Fuse, Flow, Fantom, Canto, Sui" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>*/}
                            <Checkbox
                                name="layer2"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.layer2}
                            >
                                Layer 2{' '}
                                <Tooltip label="Polygon, Base, Arbitrum, Optimism, Zora" fontSize="md">
                                <span>
                                <InfoIcon boxSize="16px" />
                                </span>
                            </Tooltip>
                            </Checkbox>
                            {/*<Checkbox
                                name="stablecoin"
                                onChange={handleFormatChange}
                                isChecked={checkedFormats.stablecoin}
                            >
                                Stablecoin
                        </Checkbox>*/}
                        </Flex>
                    </CheckboxGroup>
                    <Flex
                        gap={[2, 4, 8]}
                        alignItems={["unset", "unset", "center"]}
                        mt={4}
                        flexDirection={["column", "column", "row"]}
                        flexWrap="wrap"
                    >
                        <Button
                            leftIcon={<CryptoTradingMarginIcon />}
                            bg="primary.50"
                            color="neutral.10"
                            _hover={{}}
                            onClick={handleSaveCryptoInsightInterest}
                            fontWeight="500"
                            isDisabled={isButtonDisabled}
                            flexWrap="wrap"
                            whiteSpace="pre-wrap"
                            height="auto"
                            py={3}
                        >
                            Save Interests
                        </Button>
                    </Flex>
                </Box>
                {/*
                <Box>
                    <Text color="neutral.60" fontWeight="500">
                        Generated Insights
                    </Text>
                    {generateKpiMutation.isLoading && (
                        <Flex alignItems="center" justifyContent="center" width="full">
                            <Spinner color="primary.50" />
                        </Flex>
                    )}
                    <Stack gap={2} mt={4}>
                        {generateKpiMutation.data &&
                            generateKpiMutation.data.map((kpi, index) => {
                                return <InsightItem kpi={kpi} key={index} />;
                            })}
                    </Stack>
                </Box>
                */}
            </Stack>
        </PageContainer>
    );
}

export default InsightGenerator;
