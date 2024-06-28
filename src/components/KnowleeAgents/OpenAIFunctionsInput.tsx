import {
  Spinner,
  Tooltip,
  useColorModeValue,
  FormLabel,
  FormControl,
  useBreakpointValue
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useAvailableFunctionsWithGrouping } from "src/api/queries/knowleeAgentQuery";
import { CreateKnowleeAgentPayload } from "src/api/requests/knowleeAgentIndex";
import { InfoOutlineIcon } from "@chakra-ui/icons"

import {
  Select
} from "chakra-react-select";

interface Props {
  handleChange: {
      (e: ChangeEvent<any>): void;
      <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;
  };
  values: CreateKnowleeAgentPayload;
  setValues: (values: CreateKnowleeAgentPayload, shouldValidate?: boolean) => void;
}

function OpenAIFunctionsInput({ values, setValues }: Props) {
  const labelTextColor = useColorModeValue("neutral.60", "neutral.40");

  const { data: availableFunctionListWithGrouping, isLoading: availableFunctionListLoading } = useAvailableFunctionsWithGrouping();
  const resSelectW = useBreakpointValue({base:"100%", md:"682px"});
  const selectColorMode =  useColorModeValue("white", "#232627");
  const selectHoverColorMode =  useColorModeValue("#E2E8F0", "#474a4b");
  function FunctionTypeList() {
      if (availableFunctionListLoading) return <Spinner speed="0.8s" color="primary.50" />;
      if (!availableFunctionListWithGrouping || !availableFunctionListWithGrouping.length) return null;
  
      const functionTypes = availableFunctionListWithGrouping.map((group) => ({
          label: group.functionType.charAt(0).toUpperCase() + group.functionType.slice(1).replace(/_/g, ' '),
          value: group.functionType
      }));
  
      return (
        <Select
          useBasicStyles={true}
          isMulti
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              width: resSelectW,
              height:"56px",
            }),
            option:(provided) => ({
              ...provided,
               backgroundColor:  selectColorMode,
               _hover: {
                bg:  selectHoverColorMode,
            },
            }),
            menuList:(provided) => ({
              ...provided,
               backgroundColor: selectColorMode,
            }),
            
          }}
          placeholder='Connect AI to Apps tools'
          menuPosition="fixed"
          options={functionTypes}
          value={availableFunctionListWithGrouping?.filter(group=>{
            return values?.functionTypes?.includes(group.functionType)
          }).map(group=>({label: group.functionType.charAt(0).toUpperCase() + group.functionType.slice(1), value: group.functionType}))}
          onChange={(selected) => {
            setValues({ ...values, functionTypes: selected.map((fn) => fn.value) });
          }}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          selectedOptionStyle="check"
        />
      );
  }

  return (
    <FormControl
      maxWidth={resSelectW}
    >
          <FormLabel color={labelTextColor} fontWeight="500" > Tools
             <Tooltip label="Enhance your chat experience by adding interactive tools that allow for direct in-chat creations and analyses. They may consume more credits." fontSize="sm">
                 <span>
                   <InfoOutlineIcon cursor="help" boxSize="14px" ml="2" color="primary.50" />
              </span>
             </Tooltip>
          </FormLabel>
          <FunctionTypeList  />
    </FormControl>
    );
  }
  
  export default OpenAIFunctionsInput;