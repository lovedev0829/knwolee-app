/* eslint-disable react-refresh/only-export-components */
import { Modal, ModalCloseButton, ModalContent, ModalOverlay, useColorMode } from "@chakra-ui/react";
import { SOURCE_TYPE, SourceType } from "../SourcesList";
import MediumModal from "./MediumModal";
import PdfModal from "./PdfModal";
import TwitterModal from "./TwitterModal";
import CSVModal from "./CSVModal";
import UrlModal from "./UrlModal";
import CodaModal from "./CodaModal";
import BubbleMapsModal from "./BubbleMapsModal";
import ArtemisModal from "./ArtemisModal";
import NewsApiModal from "./NewsApiModal";
import YoutubeModal from "./YoutubeModal";
import RedditModal from "./RedditModal";
import RequestModal from "./RequestModal";
import GitbookModal from "./GitbookModal";
import OpenAIModal from "./OpenAIModal";
import GithubModal from "./GihubModal";
import LinkedInModal from "./LinkedInModal/LinkedInModal";

const twitter = `Input tweets, threads, user profiles and hashtags to get insightful data right at your fingertips. Leverage the vast information on Twitter with ease and efficiency.`;
const medium = `Just input the user profiles or specific articles that catch your interest, and Knowlee will do the rest. You'll have insightful data extracted from thought-provoking posts on Medium, directly accessible for you.`;
const pdf = `All you need to do is input the URL of the PDF you're interested in. Knowlee will extract the knowledge and make it ready for you.`;
const csv = `Input tweets, threads, user profiles and hashtags to get insightful data right at your fingertips. Leverage the vast information on Twitter with ease and efficiency.`;
const youtube = `Whether it's a single video, a user's full profile, or an entire channel, just input the necessary URLs. Knowlee can learn from it all, integrating the content into your AI-powered discussions.`;
const artemis = `Amplify your crypto knowledge with Knowlee. By choosing the metrics, you allow Knowlee to integrate key insights from the world's most advanced crypto analytics platform.`;
const news = `Track the pulse of the world. Provide keywords or topics and let Knowlee collect relevant news articles for you. These insights enrich your AI discussions, providing comprehensive and current conversations on global affairs.`;
const url = `Dive deeper into the web. Simply provide Knowlee with a URL, and let it extract and assimilate knowledge directly from the source. Whether it's nature, every piece of information enhances your AI-driven discussions. Stay informed and curious.`;
const coda = `Enjoy Coda Notes.`;
const bubblemaps = `Unleash the power of advanced data visualization right in your Knowlee interface by connecting with BubbleMaps. Simply enter the details of the tokens and smart wallets you wish to track, and transform the way you view your investments today.`;
const reddit = `Just input the necessary URLs of the reddit. Our system can learn from it all, seamlessly integrating the content into your AI-driven discussions on Reddit.`;
const openai = `Share the conversation link between you and ChatGPT, Our system can analyze the conversation and can answer you based on the conversation you had.`;
const request = `Want to see your favorite data source integrated with Knowlee? Here's your opportunity. Just input the details of your desired tool or service, and our team will review your request. Knowlee is dedicated to expanding its connected services to better cater to your needs. Your input helps us evolve - shaping a future enriched with knowledge for all.`;
const linkedin = `Tap into the professional network of LinkedIn through Knowlee. Whether you're looking for insights on industry trends, seeking professional contacts, or researching potential hires, LinkedIn and Knowlee together make networking and professional information gathering more efficient and impactful.`;
const github = `Integrate the power of GitHub directly into Knowlee to access repositories, issues, and commits without leaving your platform. This integration allows you to fetch and analyze code.`;
const gitbook = `Connect seamlessly with GitBook to integrate comprehensive documentation and collaborative workspaces into Knowlee.`;
const lorem = `This is a generic description.`;
const referral = `Don't keep us a secret! Refer a friend and unblock amazing perks of both of you.`

export const MODALS_DESCRIPTIONS = {
  TWITTER: twitter,
  MEDIUM: medium,
  PDF: pdf,
  CSV: csv,
  YOUTUBE: youtube,
  ARTEMIS: artemis,
  NEWSAPI: news,
  URL: url,
  CODA: coda,
  BUBBLEMAPS: bubblemaps,
  REDDIT: reddit,
  GITBOOK: gitbook,
  OPENAI: openai,
  GITHUB: github,
  REQUEST: request,
  REFERRAL: referral,
  LINKEDIN: linkedin,
};

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceType: SourceType;
}



const SourceModal: React.FC<SourceModalProps> = ({
  isOpen,
  onClose,
  sourceType,
}) => {
  const { colorMode } = useColorMode();
  const renderModalContent = () => {
    if (sourceType === SOURCE_TYPE.TWITTER)
      return <TwitterModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.MEDIUM)
      return <MediumModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.CSV)
      return <CSVModal />;
    if (sourceType === SOURCE_TYPE.URL)
      return <UrlModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.CODA)
      return <CodaModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.BUBBLEMAPS)
    return <BubbleMapsModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.ARTEMIS)
      return <ArtemisModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.NEWSAPI)
      return <NewsApiModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.YOUTUBE)
      return <YoutubeModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.REQUEST)
      return <RequestModal />;
    if (sourceType === SOURCE_TYPE.PDF) 
      return <PdfModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.REDDIT)
      return <RedditModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.GITBOOK)
      return <GitbookModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.OPENAI)
      return <OpenAIModal onClose={onClose} />;
    if (sourceType === SOURCE_TYPE.GITHUB)
      return <GithubModal onClose={onClose} />;
    // TODO: add other sources modals
    switch (sourceType) {
      case SOURCE_TYPE.LINKEDIN: {
        return <LinkedInModal onClose={onClose} />;
      }

      case SOURCE_TYPE.GOOGLE_DRIVE:
      case SOURCE_TYPE.ONEDRIVE:{
        return null;
      }

      default:
        // console.log(`${sourceType} is not defined in renderModalContent`);
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay bg={colorMode === "dark" ? "rgba(35, 38, 39, 0.90)" : undefined} />
      <ModalContent
        maxWidth="760px"
        p={["20px 20px", "20px 20px", "48px 40px"]}
        borderRadius="24px"
        backgroundColor={colorMode === "dark" ? "neutral.100" : undefined}
      >
        <ModalCloseButton color={colorMode === "dark" ? "neutral.70" : undefined} />
        {renderModalContent()}
      </ModalContent>
    </Modal>
  );
};

export default SourceModal;
