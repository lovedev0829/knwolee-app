import { Box, Spinner } from "@chakra-ui/react";
import { useDefaultProcesses } from "src/api/queries/knowleeProcessQuery";
import DefaultProcessCard from "src/components/KnowleeProcesses/DefaultProcessCard";

const DefaultProcesses = () => {
  const { data, isLoading } = useDefaultProcesses();
  if (isLoading)
    return (
      <Box width="full" textAlign="center">
        <Spinner speed="0.8s" color="primary.50" />
      </Box>
    );

  if(!data?.length) return;

  return (
    <>
      {data.map((userProcess) => {
        return (
          <DefaultProcessCard
            userProcess={userProcess}
            key={userProcess._id}
          />
        );
      })}
    </>
  );
};

export default DefaultProcesses;
