import {
  Box,
  Flex,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text
} from "@chakra-ui/react";
import { Row } from "./Row";
import { useUserKnowledgeData } from "../../../api/queries";
import React from "react";

export interface IEntityFilter {
    status: string, sourceType: string, subSetType: string
}

export interface Props {
  filter: IEntityFilter
}

export const SourcesTable: React.FC<Props> = ({ filter }) => {

  const { data: userEntities, isLoading, isError } = useUserKnowledgeData(filter);

  if (isLoading) return (
  <Box 
  width={"100%"} 
  minH={"50vh"} 
  display={"flex"} 
  justifyContent={"center"} 
  alignItems={"center"} 
  >
    <Spinner speed="0.8s" color="primary.50" />
  </Box>)

  if (isError) return <div>Error...</div>

  if (!userEntities?.length) return <Flex py='16px' fontSize='16px' w='100%' justify='center' alignItems='center'>
    <Text>There are no active sources.</Text>
  </Flex>

  return (
    <TableContainer w='100%' overflowX='unset' overflowY='unset' >
      <Table variant="simple" >
        <Tbody overflow="auto">
          {userEntities
            // ?.sort((a, b) => b.createdAt - a.createdAt)
            .map((entity) => (
            <Row
              key={entity.id}
              entity={entity}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
