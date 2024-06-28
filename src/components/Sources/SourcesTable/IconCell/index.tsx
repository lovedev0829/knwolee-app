import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import MediumIcon from "../../../../Icons/MediumIcon";
import TwitterIcon from "../../../../Icons/TwitterIcon";
import YouTubeIcon from "../../../../Icons/YoutubeIcon";
import DocIcon from "../../../../Icons/DocIcon";
import CodaIcon from "../../../../Icons/CodaIcon";
import PdfIcon from "../../../../Icons/PdfIcon";
import CSVIcon from "../../../../Icons/CSVIcon";
import ArtemisIcon from "../../../../Icons/ArtemisIcon";
import BubblemapsIcon from "../../../../Icons/BubblemapsIcon";
import UrlIcon from "../../../../Icons/UrlIcon";
import NewsIcon from "../../../../Icons/NewsIcon";
import { SOURCE_TYPE, SourceType } from "../../SourcesList";
import RedditIcon from "src/Icons/RedditIcon";
import GitbookIcon from "src/Icons/GitbookIcon";
import OpenAIIcon from "src/Icons/OpenAIIcon";
import GithubIcon from "src/Icons/GithubIcon";
import Recording01Icon from "src/Icons/Recording02Icon";
import OneDriveIcon from "src/Icons/OneDriveIcon";
import GoogleDriveIcon from "src/Icons/GoogleDriveIcon";
import LinkedinIcon from "src/Icons/LinkedinIcon";

export const SourceIcon: React.FC<{ sourceType: SourceType }> = ({
  sourceType,
}) => {
  const renderIcon = () => {
    if (sourceType === SOURCE_TYPE.YOUTUBE) return <YouTubeIcon />;
    if (sourceType === SOURCE_TYPE.MEDIUM) return <MediumIcon />;
    if (sourceType === SOURCE_TYPE.TWITTER) return <TwitterIcon />;
    if (sourceType === SOURCE_TYPE.PDF) return <PdfIcon />;
    if (sourceType === SOURCE_TYPE.CSV) return <CSVIcon />;
    if (sourceType === SOURCE_TYPE.ARTEMIS) return <ArtemisIcon />;
    if (sourceType === SOURCE_TYPE.BUBBLEMAPS) return <BubblemapsIcon />;
    if (sourceType === SOURCE_TYPE.URL) return <UrlIcon />;
    if (sourceType === SOURCE_TYPE.CODA) return <CodaIcon />;
    if (sourceType === SOURCE_TYPE.NEWSAPI) return <NewsIcon />;
    if (sourceType === SOURCE_TYPE.DOC) return <DocIcon />;
    if (sourceType === SOURCE_TYPE.REDDIT) return <RedditIcon />;
    if (sourceType === SOURCE_TYPE.GITBOOK) return <GitbookIcon />;
    if (sourceType === SOURCE_TYPE.OPENAI) return <OpenAIIcon />;
    if (sourceType === SOURCE_TYPE.GITHUB) return <GithubIcon />;
    switch (sourceType) {
      case SOURCE_TYPE.MICROSOFT_ONEDRIVE:
        return <OneDriveIcon />;

      case SOURCE_TYPE.GOOGLE_DRIVE:
        return <GoogleDriveIcon />;

      case SOURCE_TYPE.LINKEDIN:
        return <LinkedinIcon />;

      default:
        // console.log(
        //   `case for sourceType=${sourceType} is not defined in renderIcon`
        // );
        return null;
    }
  };

  const renderText = () => {
    if (sourceType === SOURCE_TYPE.YOUTUBE) return "YouTube";
    if (sourceType === SOURCE_TYPE.TWITTER) return "Twitter";
    if (sourceType === SOURCE_TYPE.MEDIUM) return "Medium";
    if (sourceType === SOURCE_TYPE.PDF) return "PDF";
    if (sourceType === SOURCE_TYPE.CSV) return "CSV";
    if (sourceType === SOURCE_TYPE.ARTEMIS) return "Artemis";
    if (sourceType === SOURCE_TYPE.BUBBLEMAPS) return "Bubblemaps";
    if (sourceType === SOURCE_TYPE.URL) return "Url";
    if (sourceType === SOURCE_TYPE.CODA) return "Coda";
    if (sourceType === SOURCE_TYPE.NEWSAPI) return "News";
    if (sourceType === SOURCE_TYPE.DOC) return "Document";
    switch (sourceType) {
      // for PDF
      case "application/pdf":
        return "PDF";

      // for DOCX
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "Document";

      // for TXT
      case "text/plain":
        return "Text";

      // for CSV
      case "text/csv":
        return "CSV";

      // for JSON
      case "application/json":
        return "JSON";

       // for audio
      case "audio/mp3":
      case "audio/mpeg":
      case "audio/x-m4a":
      case "audio/wav":
      case "audio/mpga":
        return "AUDIO" 
      case SOURCE_TYPE.MICROSOFT_ONEDRIVE:
        return "Microsoft OneDrive";

      case SOURCE_TYPE.GOOGLE_DRIVE:
        return "Google Drive";

      case SOURCE_TYPE.LINKEDIN:
        return "LinkedIn";

      default:
        // console.log(
        //   `case for sourceType=${sourceType} is not defined in renderText`
        // );
        return null;
    }
  };

  const IconType = () => {
    switch (sourceType) {
      // for PDF
      case "application/pdf":
        return (
          <Flex
            width="32px"
            height="32px"
            borderRadius="10px"
            boxSizing="border-box"
            padding={2}
            alignItems="center"
            justifyContent="center"
            backgroundColor="icons.pdf"
          >
            <PdfIcon />
          </Flex>
        );

      // for DOCX and TXT
      case "text/plain":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <Flex
            width="32px"
            height="32px"
            borderRadius="10px"
            boxSizing="border-box"
            padding={2}
            alignItems="center"
            justifyContent="center"
            backgroundColor="icons.doc"
          >
            <DocIcon />
          </Flex>
        );

      // // for TXT
      // case "text/plain":
      //   return (
      //     <Flex
      //       width="32px"
      //       height="32px"
      //       borderRadius="50%"
      //       boxSizing="border-box"
      //       padding="4px"
      //       alignItems="center"
      //       justifyContent="center"
      //     >
      //       <Img src="images/icon-txt.png" />
      //     </Flex>
      //   );

      // for CSV
      case "text/csv":
        return (
          <Flex
            width="32px"
            height="32px"
            borderRadius="10px"
            boxSizing="border-box"
            padding={2}
            alignItems="center"
            justifyContent="center"
            backgroundColor="icons.csv"
          >
            <CSVIcon />
          </Flex>
        );

      // for JSON
      case "application/json":
        return (
          <Flex
            width="32px"
            height="32px"
            borderRadius="50%"
            boxSizing="border-box"
            padding="4px"
            alignItems="center"
            justifyContent="center"
          >
            <Img src="../../images/icon-json.png" />
          </Flex>
        );
        case "audio/mp3":
          case "audio/mpeg":
          case "audio/x-m4a":
          case "audio/wav":
          case "audio/mpga":
           return (
             <Flex
               width="32px"
               height="32px"
               borderRadius="10px"
               boxSizing="border-box"
               padding={2}
               alignItems="center"
               justifyContent="center"
     
             >
               <Recording01Icon />
             </Flex>
           );
    }
    return (
      <Box
        width="32px"
        height="32px"
        borderRadius="50%"
        backgroundColor={`icons.${sourceType}`}
        boxSizing="border-box"
        padding="3px"
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="3px" // Additional padding to contain the SVG icon
        >
          {renderIcon()}
        </Box>
      </Box>
    );
  };

  return (
    <Box display="flex" alignItems="center">
      <IconType />
      {/*<Text ml="12px" display={["none", "none", "block"]}>{renderText()}</Text>*/}
    </Box>
  );
};
