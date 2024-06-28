/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import PageContainer from "src/components/PageContainer";
import {
  Flex,
  Text,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Box,
  useColorMode,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import AiTipseterCreationTabs from "src/components/AiTipster/AiTipsterCreationTabs";
import { useBreakpointValue } from "@chakra-ui/react";
import KnowleeLogo from "src/Icons/KnowleeLogo";
import { useFixtureUpcoming } from "src/api/queries/aiTipsterQuery";
import { AITipsterUpcomingFixture } from "src/types/aiTipster.interface";
import { useNavigate } from "react-router-dom";
import { useCreateFixtureAgentMutation } from "src/api/mutations/aiTipsterAssistantIndex";
import { format } from "date-fns";
import { useState } from "react";
import FixtureChat from "./FixtureChat";
// import FixtureChat from "./FixtureChat";

const respPaddingXRow = ["0", "0", "0", "0", "4px", "8px"];
const respPaddingXRowIcon = ["8px", "8px", "8px", "8px", "16px", "16px"];
const respPaddingYRow = ["0", "0", "0", "0", "10px", "8px"];
const respTitleW = ["50px", "100px", "150px", "150px", "250px", "400px"];

function FootballFixtures() {
  const { colorMode } = useColorMode();

  const { data: fixtureUpcoming, isLoading:isLoadingFixtureUpcoming } = useFixtureUpcoming();
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [assistant, setAssistant] = useState<string | null>();
  const [homeName, setHomeName] = useState<string>();
  const [awayName, setAwayName] = useState<string>();
  const {
    mutateAsync: createFixtureAssistant,
    isLoading,
  } = useCreateFixtureAgentMutation();

  async function handleRunClick(fixture: AITipsterUpcomingFixture) {
    const fixtures = fixture?.fixture;
    const teams = fixture?.teams;

    try {
      if (!fixtures || !teams) {
        throw new Error("No upcoming fixture found");
      }

      const { home, away } = teams;

      if (!home || !away) {
        throw new Error("Home or away team not found");
      }

      const response = await createFixtureAssistant({
        fixture_id: fixtures.id,
        team_home_name: home.name,
        team_away_name: away.name,
        team_home_id: home.id,
        team_away_id: away.id,
      });

      setHomeName(home.name);
      setAwayName(away.name);
      setAssistant(response);
      setChatModalOpen(true);
      
      
    } catch (error) {
      console.error("Error in handleRunClick:", error);
    }
  }

  if (isLoading || isLoadingFixtureUpcoming) {
    return (
      <Flex alignItems="center" justifyContent="center" minHeight="100vh" marginLeft="50%" >
        <Spinner speed="0.8s" color="primary.50" />
      </Flex>
    );
  }

  function renderFixtureChat() {
    if (assistant && homeName && awayName) {
      return (
        <FixtureChat
          assistantId={assistant}
          homeName={homeName}
          awayName={awayName}
        />
      );
    }
  }

  return (
    <PageContainer
      title={
        <Flex alignItems="center">
          <Text mr={2}>AI Tipster</Text>
        </Flex>
      }
    >
      <AiTipseterCreationTabs />
      <Flex
        justifyContent="space-between"
        w="100%"
        flexWrap="wrap"
        gap="16px"
        mt="18px"
        overflow="auto"
      >
        <TableContainer w="100%" overflowX="unset" overflowY="unset">
          <Table variant="simple">
            <Tbody overflow="auto">
              {Array.isArray(fixtureUpcoming) &&
              fixtureUpcoming.length === 0 ? (
                <>No upcoming matches </>
              ) : (
                fixtureUpcoming &&
                Array.isArray(fixtureUpcoming) &&
                fixtureUpcoming
                  .sort(
                    (a, b) =>
                      new Date(a.fixture.date).getTime() -
                      new Date(b.fixture.date).getTime()
                  )
                  .map((fixture: AITipsterUpcomingFixture) => (
                    <>
                      <Tr
                        height="64px"
                        borderRadius="10px"
                        outline="1px solid"
                        outlineColor={
                          colorMode === "dark" ? "#343839" : "neutral.20"
                        }
                        backgroundColor={
                          colorMode === "dark" ? undefined : "neutral.10"
                        }
                        border="3px solid transparent"
                        padding="16px 32px"
                        overflow="hidden"
                        color={
                          colorMode === "dark" ? "neutral.10" : "neutral.100"
                        }
                      >
                        <Td
                          px={respPaddingXRowIcon}
                          py={respPaddingYRow}
                          width={["40px", "40px", "50px"]}
                        >
                          <Box width="40px" height="40px">
                            <Image
                              src={fixture.league.logo}
                              alt="Logo"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                        </Td>
                        <Td
                          px={respPaddingXRow}
                          py={respPaddingYRow}
                          width={["50px", "50px", "auto"]}
                        >
                          <Box display="flex" mr="10px" overflow="hidden">
                            <Text isTruncated fontSize="18px" fontWeight="500">
                              {fixture.league.name}
                            </Text>
                          </Box>
                        </Td>
                        <Td
                          fontSize="16px"
                          fontWeight="400"
                          p={respPaddingXRow}
                          maxW={respTitleW}
                        >
                          <Box display="flex" mr="10px" overflow="hidden">
                            <Text isTruncated fontSize="18px" fontWeight="500">
                              {format(
                                new Date(fixture.fixture.date),
                                "dd.MM.yyyy"
                              )}
                            </Text>
                          </Box>
                        </Td>
                        <Td
                          textDecorationLine="underline"
                          fontSize="16px"
                          fontWeight="400"
                          maxWidth="100px"
                          px={respPaddingXRow}
                          py={respPaddingYRow}
                        >
                          <Box display="flex" mr="10px" overflow="hidden">
                            <Text fontSize="18px" fontWeight="500">
                              {fixture.teams.home.name} -{" "}
                              {fixture.teams.away.name}
                            </Text>
                          </Box>
                        </Td>
                        <Td
                          px={respPaddingXRow}
                          py={respPaddingYRow}
                          width="80px"
                        >
                          <Box display="flex" alignItems="center">
                            <KnowleeLogo />
                            <Text
                              ml="4px"
                              fontSize="18px"
                              fontWeight="500"
                              onClick={() => handleRunClick(fixture)}
                              cursor="pointer"
                              display={["none", "none", "table-cell"]}
                            >
                              Prediction
                            </Text>
                          </Box>
                        </Td>
                        <Td
                          px={respPaddingXRow}
                          py={respPaddingYRow}
                          display={["none", "none", "table-cell"]}
                          width="50px"
                        ></Td>
                      </Tr>
                      <Tr height="8px" />
                    </>
                  ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Modal
        isOpen={isChatModalOpen}
        onClose={() => setChatModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent maxW="80%"   p={["28px", "24px", "16px"]}>
          <ModalHeader>
            AI Tipster {homeName} - {awayName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderFixtureChat()}</ModalBody>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}

export default FootballFixtures;
