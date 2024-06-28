import {
    Box,
    Flex,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { useTutorials } from "src/api/queries/tutorialQuery";
import TutorialItem from "src/components/Tutorials/TutorialItem";

const Tutorials = () => {

  const { isLoading, data: tutorialList } = useTutorials();

  function renderTutorials() {
      if (isLoading) {
          return (
              <Flex alignItems="center" justifyContent="center">
                  <Spinner speed="0.8s" color="primary.50" />
              </Flex>
          );
      }
      if (!tutorialList?.length) {
          return <Text textAlign="center">No Tutorials Found</Text>;
      }
      return (
          <Flex
              flexDirection={"column"}
              alignItems={"center"}
              alignSelf={"stretch"}
              maxWidth={["auto", "auto", "auto", "auto", "auto", "936px"]}
              margin={"auto"}
          >
              {tutorialList.map((tutorial) => {
                  return <TutorialItem key={tutorial._id} tutorial={tutorial} />;
              })}
          </Flex>
      );
  }

  return (
      <Box
          className="scroll-hover"
          position={"relative"}
          minW={"full"}
          borderRadius={"2rem"}
          overflow={"auto"}
      >
          <Flex
              padding={["24px", "80px 40px", "80px 40px"]}
              flexDirection={"column"}
              justifyContent={["center", "center", "center", "center", "unset"]}
              alignItems={[
                  "flex-start",
                  "flex-start",
                  "flex-start",
                  "flex-start",
                  "center",
              ]}
              gap={["24px", "48px"]}
              alignSelf={"stretch"}
          >
              {renderTutorials()}
          </Flex>
      </Box>
  );
};

export default Tutorials;
