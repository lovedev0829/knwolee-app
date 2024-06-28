import { Box, Button, Flex, useBreakpointValue, useColorMode, Text, Tooltip, Select, Switch, FormLabel, FormControl, GridItem, Grid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { useState } from "react";
import PlusIcon from "../Icons/PlusIcon";
import PageContainer from "../components/PageContainer";
// import FileUpload from "../components/Sources/FileUpload";
import SourcesList, { activesourceList as activeSourceList } from "../components/Sources/SourcesList";
import { SourcesTable } from "../components/Sources/SourcesTable";
import { TabButton } from "./SharedUi/Buttons";
import { InfoIcon } from "@chakra-ui/icons";
import { activeSubsetType, entityStatus } from "src/utils/constants";
import AccountConnectorsList from "src/components/Sources/AccountConnectorsList";
import { useLocation, Location } from 'react-router-dom';

const ADD_SOURCE = "add-source";
const ACTIVE_SOURCE = "active-source";
const ACCOUNT_CONNECTORS = "account-connectors";

interface LocationState {
  activeTab: string;
}
const FeedTheBrain = () => {
  const location = useLocation();

  // Access the parameter from the link state attribute

  const activeTab = (location.state as LocationState)?.activeTab || ADD_SOURCE;

  const { colorMode } = useColorMode();
  const addSourceText = useBreakpointValue(["Add", "Add", "Add Source"]);
  const activeSourceText = useBreakpointValue(["Active", "Active", "Active Source"]);
  const accountConnectorsText = useBreakpointValue(["Account Connectors", "Account Connectors", "Account Connectors"]);
  const [isActiveSource, setIsActiveSource] = useState(false);
  const [isActiveAccountConnectors, setIsActiveAccountConnectors] = useState(false);
  const [visibleTab, setVisibleTab] = useState(activeTab);
  const [hideLockedSources, setHideLockedSources] = useState(true);

  const [filter, setFilter] = useState({ status: "", sourceType: "", subSetType: "", allowNoData: true, allowUploadedFiles: false });

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    if (name === "sourceType") {
      return setFilter(prev => ({ ...prev, [name]: value, subSetType: "" }))
    }
    setFilter(prev => ({ ...prev, [name]: value }))
  }

  const handleNoDataToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setFilter(prev => ({ ...prev, allowNoData: checked }))
  }

  const handleUploadedFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setFilter(prev => ({ ...prev, allowUploadedFiles: checked }))
  }


  return (
    <PageContainer
      title={
        <Flex alignItems="center">
          <Text mr={2}>Knowledge Sources</Text>
        </Flex>
      }
    >
      <Flex
        justifyContent="space-between"
        w="100%"
        flexWrap="wrap"
        gap="16px"
      >
        <Box display="flex" gap="12px" paddingBottom={"8px"} overflow={"auto"}>
          <TabButton
            isActive={visibleTab === ADD_SOURCE}
            onClick={() => {
              setVisibleTab(ADD_SOURCE);
            }}
          >
            {addSourceText}
          </TabButton>
          <TabButton
            isActive={visibleTab === ACTIVE_SOURCE}
            onClick={() => {
              setVisibleTab(ACTIVE_SOURCE);
            }}
          >
            {activeSourceText}
          </TabButton>
          <TabButton
            isActive={visibleTab === ACCOUNT_CONNECTORS}
            onClick={() => {
              setVisibleTab(ACCOUNT_CONNECTORS);
            }}
          >
            {accountConnectorsText}
          </TabButton>
        </Box>

        {visibleTab === ADD_SOURCE && <FormControl width={"max-content"} display="flex" alignItems="center">
          <FormLabel htmlFor="show-locked-sources" mb="0" fontWeight={400} fontSize={14}>
            Hide coming soon:
          </FormLabel>
          <Switch
            isChecked={hideLockedSources}
            onChange={(e) => {
              setHideLockedSources(e.target.checked);
            }}
          />
        </FormControl>}

        {/* <FileUpload /> */}
      </Flex>

      {visibleTab === ACTIVE_SOURCE && (
        <>
          <Accordion mt={"2"} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Flex alignItems="center" flex="1" textAlign="left" color={colorMode === "dark" ? "neutral.40" : "neutral.60"}
                >
                  <Text
                    mr={2}
                  >
                    Filters
                  </Text>
                  <Tooltip
                    label={
                      <div>
                        <Text fontWeight="normal" fontSize="sm">Expand to access different filters for your sources. You can filter by status, source type, subset type, and more.</Text>
                      </div>
                    }
                  >
                    <span>
                      <InfoIcon boxSize="12px" />
                    </span>
                  </Tooltip>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Grid mb={-3} alignItems="center" templateColumns={{ lg: "repeat(5, 1fr)", md: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}>
                  <GridItem w='100%' justifyContent="center" display="flex" alignItems="center">
                    <Select maxWidth="80%" size="sm" value={filter.status} name="status" onChange={handleFilterChange} placeholder='Knowledge Status'>
                      {entityStatus.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
                    </Select>
                    <Tooltip label="Filter sources by their status." fontSize="sm">
                      <span>
                        <InfoIcon boxSize="12px" ml="2" color="neutral.60" />
                      </span>
                    </Tooltip>
                  </GridItem>
                  <GridItem w='100%' justifyContent="center" display="flex" alignItems="center">
                    <Select maxWidth="70%" size="sm" value={filter.sourceType} name="sourceType" onChange={handleFilterChange} placeholder='Source App'>
                      {activeSourceList.map((source) => <option key={source.sourceType} value={source.sourceType}>{source.title}</option>)}
                    </Select>
                    <Tooltip label="Filter sources by their type." fontSize="sm">
                      <span>
                        <InfoIcon boxSize="12px" ml="2" color="neutral.60" />
                      </span>
                    </Tooltip>
                  </GridItem>
                  <GridItem w='100%' justifyContent="center" display="flex" alignItems="center">
                    <Select maxWidth="77%" size="sm" value={filter.subSetType} name="subSetType" onChange={handleFilterChange} placeholder='Content Type'>
                      {filter.sourceType ? activeSubsetType[filter.sourceType || ""].map(key => <option key={key.value} value={key.value}>{key.label}</option>) : <option disabled value="">Please select sourceType</option>}
                    </Select>
                    <Tooltip label="Filter by subset type based on the selected source type." fontSize="sm">
                      <span>
                        <InfoIcon boxSize="12px" ml="2" color="neutral.60" />
                      </span>
                    </Tooltip>
                  </GridItem>
                  <GridItem w='100%' px="4" justifyContent="center" display="flex" alignItems="center">
                    <FormControl maxWidth="100%" display='flex' alignItems='center'>
                      <FormLabel htmlFor='show-no-data' mb='0' fontSize="13px">
                        Show 'No data'
                      </FormLabel>
                      <Switch id="show-no-data" name="allowNoData" defaultChecked={filter.allowNoData} checked={filter.allowNoData} onChange={handleNoDataToggle} />
                      <Tooltip label="Toggle to show or hide sources with no data." fontSize="sm">
                        <span>
                          <InfoIcon boxSize="12px" ml="2" color="neutral.60" />
                        </span>
                      </Tooltip>
                    </FormControl>
                  </GridItem>
                  <GridItem w='100%' px="0" justifyContent="center" display="flex" alignItems="center">
                    <FormControl maxWidth="100%" display='flex' alignItems='center'>
                      <FormLabel htmlFor='show-only-uploaded-files' mb='0' fontSize="13px">
                        Only Uploaded Files
                      </FormLabel>
                      <Switch id="show-only-uploaded-files" name="allowNoData" defaultChecked={filter.allowUploadedFiles} checked={filter.allowUploadedFiles} onChange={handleUploadedFiles} />
                      <Tooltip label="Toggle to filter only sources that include uploaded files." fontSize="sm">
                        <span>
                          <InfoIcon boxSize="12px" ml="2" color="neutral.60" />
                        </span>
                      </Tooltip>
                    </FormControl>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Flex
            className="scroll-hover"
            minH={0}
            overflow="auto"
            mt="6px"
            mb="1px"
          >
            <SourcesTable filter={filter} />
          </Flex>
          <Button
            w="100%"
            leftIcon={<PlusIcon />}
            fontSize="16px"
            lineHeight="24px"
            fontWeight="500"
            color={colorMode === "dark" ? "neutral.10" : "primary.50"}
            bg={colorMode === "dark" ? "neutral.80" : "primary.10"}
            borderRadius="10px"
            py="24px"
            onClick={() => {
              setVisibleTab(ADD_SOURCE);
            }}
          >
            Add New
          </Button>
        </>
      )}

      {visibleTab === ADD_SOURCE && (
        <SourcesList hideLockedSources={hideLockedSources} />
      )}

      {visibleTab === ACCOUNT_CONNECTORS && (
        <AccountConnectorsList />
      )}

    </PageContainer>
  );
};

export default FeedTheBrain;
