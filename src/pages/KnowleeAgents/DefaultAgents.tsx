import { Box, Spinner } from "@chakra-ui/react";
import { useDefaultAgents } from "src/api/queries/knowleeAgentQuery";
import DefaultAgentCard from "src/components/KnowleeAgents/DefaultAgentCard";

const DefaultAgents = () => {
  const { data, isLoading } = useDefaultAgents();
  if (isLoading)
    return (
      <Box width="full" textAlign="center">
        <Spinner speed="0.8s" color="primary.50" />
      </Box>
    );

  if(!data?.length) return;

  return (
    <>
      {data.map((userAgent) => {
        return (
          <DefaultAgentCard
            userAgent={userAgent}
            key={userAgent._id}
          />
        );
      })}
    </>
  );
};

export default DefaultAgents;
