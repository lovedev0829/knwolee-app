import type { SourceCardProps } from '../SourceCard';
import CSVIcon from "../../../Icons/CSVIcon";
import MediumIcon from "../../../Icons/MediumIcon";
import PdfIcon from "../../../Icons/PdfIcon";
import TwitterIcon from "../../../Icons/TwitterIcon";
import YoutubeIcon from "../../../Icons/YoutubeIcon";
import CryptoIcon from "../../../Icons/BtcIcon";
import UrlIcon from "../../../Icons/UrlIcon";
import CodaIcon from "../../../Icons/CodaIcon";
import NewsIcon from "../../../Icons/NewsIcon";
import BubblemapsIcon from "../../../Icons/BubblemapsIcon";
import OpenAIIcon from "../../../Icons/OpenAIIcon";
import GitbookIcon from "../../../Icons/GitbookIcon";
import RedditIcon from "../../../Icons/RedditIcon";
import TelegramIcon from "../../../Icons/TelegramIcon";
import DiscordIcon from "../../../Icons/DiscordIcon";
import FinancialMarketIcon from "../../../Icons/FinancialMarketIcon";
import GithubIcon from "../../../Icons/GithubIcon";
import LinkedinIcon from "../../../Icons/LinkedinIcon";
import IndeedIcon from "../../../Icons/IndeedIcon";
import GlassdoorIcon from "../../../Icons/GlassdoorIcon";
import OpenSeaIcon from "../../../Icons/OpenSeaIcon";
import GoogleJobIcon from "../../../Icons/GoogleJobIcon";
import UpworkIcon from "../../../Icons/UpworkIcon";
import BookingIcon from "../../../Icons/BookingIcon";
import TripAdvisorIcon from "../../../Icons/TripAdvisorIcon";
import AirBnbIcon from "../../../Icons/AirBnbIcon";
import HotelsIcon from "../../../Icons/HotelsIcon";
import TheForkIcon from "../../../Icons/TheForkIcon";
import RyanAirIcon from "../../../Icons/RyanAirIcon";
import SkyScannerIcon from "../../../Icons/SkyScannerIcon";
import EasyJetIcon from "../../../Icons/EasyJetIcon";
import KickstarterIcon from "../../../Icons/KickstarterIcon";
import SimilarWebIcon from "../../../Icons/SimilarWebIcon";
import ProductHuntIcon from "../../../Icons/ProductHuntIcon";
import AmazonIcon from "../../../Icons/AmazonIcon";
import AlibabaIcon from "../../../Icons/AlibabaIcon";
import AliexpressIcon from "../../../Icons/AliexpressIcon";
import TemuIcon from "../../../Icons/TemuIcon";
import ShopifyIcon from "../../../Icons/ShopifyIcon";
import EbayIcon from "../../../Icons/EbayIcon";
import EtsyIcon from "../../../Icons/EtsyIcon";
import WalmartIcon from "../../../Icons/WalmartIcon";
import SheinIcon from "../../../Icons/SheinIcon";
import NikeIcon from "../../../Icons/NikeIcon";
import AsosIcon from "../../../Icons/AsosIcon";
import ZalandoIcon from "../../../Icons/ZalandoIcon";
import DecathlonIcon from "../../../Icons/DecathlonIcon";
import BestBuyIcon from "../../../Icons/BestBuyIcon";
import HackerNewsIcon from "../../../Icons/HackerNewsIcon";
import GoogleMapsIcon from "../../../Icons/GoogleMapsIcon";
import TikTokIcon from "../../../Icons/TikTokIcon";
import FacebookIcon from "../../../Icons/FacebookIcon";
import InstagramIcon from "../../../Icons/InstagramIcon";
import WhatsAppIcon from "../../../Icons/WhatsAppIcon";
import MetaThreadsIcon from "../../../Icons/MetaThreadsIcon";
import QuoraIcon from "../../../Icons/QuoraIcon";
import SoccerStatsIcon from "../../../Icons/SoccerStatsIcon";
import AllRecipesIcon from "../../../Icons/AllRecipesIcon";
import EventbriteIcon from "../../../Icons/EventbriteIcon";
import GetYourGuideIcon from "../../../Icons/GetYourGuideIcon";
import SpotifyIcon from "../../../Icons/SpotifyIcon";
import TrustPilotIcon from "../../../Icons/TrustPilotIcon";
import KnowleeLogo from 'src/Icons/KnowleeLogo';
import GoogleDriveIcon from 'src/Icons/GoogleDriveIcon';
import OneDriveIcon from 'src/Icons/OneDriveIcon';

export const SOURCE_TYPE = {
  TWITTER: "twitter",
  MEDIUM: "medium",
  PDF: "pdf",
  CSV: "csv",
  YOUTUBE: "youtube",
  ARTEMIS: "artemis",
  BUBBLEMAPS: "bubblemaps",
  URL: "url",
  CODA: "coda",
  NEWSAPI: "news",
  DOC: "doc",
  REQUEST: "request",
  OPENAI: "openai",
  REDDIT: "reddit",
  TELEGRAM: "telegram",
  DISCORD: "discord",
  FINANCIAL_MARKET: "financial_market",
  GITHUB: "github",
  GITBOOK: "gitbook",
  OPENSEA: "opensea",
  LINKEDIN: "linkedin",
  INDEED: "indeed",
  GLASSDOOR: "glassdoor",
  THEFORK: "thefork",
  GOOGLE_JOB: "google_job",
  UPWORK: "upwork",
  BOOKING: "booking",
  TRIPADVISOR: "tripadvisor",
  AIRBNB: "airbnb",
  HOTELS: "hotels",
  RYANAIR: "ryanair",
  SKYSCANNER: "skyscanner",
  EASYJET: "easyjet",
  KICKSTARTER: "kickstarter",
  SIMILARWEB: "similarweb",
  PRODUCTHUNT: "producthunt",
  AMAZON: "amazon",
  ALIBABA: "alibaba",
  ALIEXPRESS: "aliexpress",
  TEMU: "temu",
  SHOPIFY: "shopify",
  EBAY: "ebay",
  ETSY: "etsy",
  WALMART: "walmart",
  SHEIN: "shein",
  NIKE: "nike",
  ASOS: "asos",
  ZALANDO: "zalando",
  DECATHLON: "decathlon",
  BESTBUY: "bestbuy",
  HACKERNEWS: "hackernews",
  GOOGLE_MAPS: "google_maps",
  TIKTOK: "tiktok",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  WHATSAPP: "whatsapp",
  META_THREADS: "meta_threads",
  QUORA: "quora",
  SOCCER_STATS: "soccer_stats",
  ALLRECIPES: "allrecipes",
  EVENTBRITE: "eventbrite",
  GETYOURGUIDE: "getyourguide",
  SPOTIFY: "spotify",
  TRUSTPILOT: "trustpilot",
  DROPBOX: "dropbox",
  GOOGLE_DRIVE: "google_drive",
  NOTION: "notion",
  ONEDRIVE: "onedrive",
  OUTLOOK: "outlook",
  SHAREPOINT: "sharepoint",
  MICROSOFT_ONEDRIVE: "microsoft_onedrive",
};

export const sourceList: SourceCardProps[] = [
  {
    title: "YouTube",
    icon: <YoutubeIcon />,
    iconColor: "icons.youtube",
    action: "Add",
    sourceType: SOURCE_TYPE.YOUTUBE,
    isLocked: false,
  },
  {
    title: "Google Drive",
    icon: <GoogleDriveIcon />,
    iconColor: "",
    action: "Add",
    sourceType: SOURCE_TYPE.GOOGLE_DRIVE,
    isLocked: false,
    isCarbon: true,
  },
  {
    title: "News",
    icon: <NewsIcon />,
    iconColor: "icons.news",
    action: "Add",
    sourceType: SOURCE_TYPE.NEWSAPI,
    isLocked: false,
  },
  {
    title: "Twitter",
    icon: <TwitterIcon />,
    iconColor: "icons.twitter",
    action: "Add",
    sourceType: SOURCE_TYPE.TWITTER,
    isLocked: false,
  },
  {
    title: "Medium",
    icon: <MediumIcon />,
    iconColor: "icons.medium",
    action: "Add",
    sourceType: SOURCE_TYPE.MEDIUM,
    isLocked: false,
  },
  {
    title: "PDF URL",
    icon: <PdfIcon />,
    iconColor: "icons.pdf",
    action: "Add",
    sourceType: SOURCE_TYPE.PDF,
    isLocked: false,
  },
  /*{
    title: "CSV",
    icon: <CSVIcon />,
    iconColor: "#45B058",
    action: "Add",
    sourceType: SOURCE_TYPE.CSV,
    isLocked: false,
},*/
  {
    title: "OneDrive",
    icon: <OneDriveIcon />,
    iconColor: "",
    action: "Add",
    sourceType: SOURCE_TYPE.ONEDRIVE,
    isLocked: false,
  },
  {
    title: "ChatGPT Chats",
    icon: <OpenAIIcon />,
    iconColor: "icons.openai",
    action: "Add",
    sourceType: SOURCE_TYPE.OPENAI,
    isLocked: false,
  },
  {
    title: "URL",
    icon: <UrlIcon />,
    iconColor: "icons.url",
    action: "Add",
    sourceType: SOURCE_TYPE.URL,
    isLocked: false,
  },
  {
    title: "Reddit",
    icon: <RedditIcon />,
    iconColor: "icons.reddit",
    action: "Add",
    sourceType: SOURCE_TYPE.REDDIT,
    isLocked: false,
  },
  {
    title: "BubbleMaps",
    icon: <BubblemapsIcon />,
    iconColor: "icons.bubblemaps",
    action: "Add",
    sourceType: SOURCE_TYPE.BUBBLEMAPS,
    isLocked: false,
  },
  {
    title: "GitBook",
    icon: <GitbookIcon />, 
    iconColor: "icons.gitbook",
    action: "Add",
    sourceType: SOURCE_TYPE.GITBOOK, 
    isLocked: false,
  },
  {
    title: "GitHub",
    icon: <GithubIcon />,
    iconColor: "icons.github",
    action: "Add",
    sourceType: SOURCE_TYPE.GITHUB,
    isLocked: false,
  },
  {
    title: "Coda Notes",
    icon: <CodaIcon />,
    iconColor: "icons.coda",
    action: "Add",
    sourceType: SOURCE_TYPE.CODA,
    isLocked: false,
  },
  {
    title: "LinkedIn",
    icon: <LinkedinIcon />,
    iconColor: "icons.linkedin",
    action: "Add",
    sourceType: SOURCE_TYPE.LINKEDIN,
    isLocked: false,
  },
  // {
  //   title: "Dropbox",
  //   icon: <KnowleeLogo />,
  //   iconColor: "",
  //   action: "Add",
  //   sourceType: SOURCE_TYPE.DROPBOX,
  //   isLocked: false,
  //   isCarbon: true,
  // },
  // {
  //   title: "Notion",
  //   icon: <KnowleeLogo />,
  //   iconColor: "",
  //   action: "Add",
  //   sourceType: SOURCE_TYPE.NOTION,
  //   isLocked: false,
  //   isCarbon: true,
  // },
  // {
  //   title: "Outlook",
  //   icon: <KnowleeLogo />,
  //   iconColor: "",
  //   action: "Add",
  //   sourceType: SOURCE_TYPE.OUTLOOK,
  //   isLocked: false,
  //   isCarbon: true,
  // }, 
  // {
  //   title: "Sharepoint",
  //   icon: <KnowleeLogo />,
  //   iconColor: "",
  //   action: "Add",
  //   sourceType: SOURCE_TYPE.SHAREPOINT,
  //   isLocked: false,
  //   isCarbon: true,
  // },
  {
    title: "Telegram",
    icon: <TelegramIcon />,
    iconColor: "icons.telegram",
    action: "Add",
    sourceType: SOURCE_TYPE.TELEGRAM,
    isLocked: true,
  },
  {
    title: "Discord",
    icon: <DiscordIcon />,
    iconColor: "icons.discord",
    action: "Add",
    sourceType: SOURCE_TYPE.DISCORD,
    isLocked: true,
  },
  {
    title: "Financial Market Prices",
    icon: <FinancialMarketIcon />,
    iconColor: "icons.financialmarket",
    action: "Add",
    sourceType: SOURCE_TYPE.FINANCIAL_MARKET,
    isLocked: true,
  },
  {
    title: "Crypto",
    icon: <CryptoIcon />,
    iconColor: "icons.artemis",
    action: "Add",
    sourceType: SOURCE_TYPE.ARTEMIS,
    isLocked: true,
  },
  {
    title: "OpenSea",
    icon: <OpenSeaIcon />,
    iconColor: "icons.opensea",
    action: "Add",
    sourceType: SOURCE_TYPE.OPENSEA,
    isLocked: true,
  },
  {
    title: "Indeed",
    icon: <IndeedIcon />, // Replace with the actual icon component for Indeed
    iconColor: "icons.indeed",
    action: "Add",
    sourceType: SOURCE_TYPE.INDEED, // Add the corresponding source type for Indeed
    isLocked: true,
  },
  {
    title: "Glassdoor",
    icon: <GlassdoorIcon />, // Replace with the actual icon component for Glassdoor
    iconColor: "icons.glassdoor",
    action: "Add",
    sourceType: SOURCE_TYPE.GLASSDOOR, // Add the corresponding source type for Glassdoor
    isLocked: true,
  }, {
    title: "Google Job",
    icon: <GoogleJobIcon />, // Replace with the actual icon component for Google Job
    iconColor: "icons.googlejob",
    action: "Add",
    sourceType: SOURCE_TYPE.GOOGLE_JOB,
    isLocked: true,
  },
  {
    title: "Upwork",
    icon: <UpworkIcon />, // Replace with the actual icon component for Upwork
    iconColor: "icons.upwork",
    action: "Add",
    sourceType: SOURCE_TYPE.UPWORK,
    isLocked: true,
  },
  {
    title: "Booking.com",
    icon: <BookingIcon />, // Replace with the actual icon component for Booking.com
    iconColor: "icons.booking",
    action: "Add",
    sourceType: SOURCE_TYPE.BOOKING,
    isLocked: true,
  },
  {
    title: "Tripadvisor",
    icon: <TripAdvisorIcon />, // Replace with the actual icon component for Tripadvisor
    iconColor: "icons.tripadvisor",
    action: "Add",
    sourceType: SOURCE_TYPE.TRIPADVISOR,
    isLocked: true,
  },
  {
    title: "The Fork",
    icon: <TheForkIcon />, // Assuming you have a TheForkIcon
    iconColor: "icons.thefork",
    action: "Add",
    sourceType: SOURCE_TYPE.THEFORK,
    isLocked: true,
  },
  {
    title: "Airbnb",
    icon: <AirBnbIcon />, // Replace with the actual icon component for Airbnb
    iconColor: "icons.airbnb",
    action: "Add",
    sourceType: SOURCE_TYPE.AIRBNB,
    isLocked: true,
  },
  {
    title: "Hotels.com",
    icon: <HotelsIcon />, // Replace with the actual icon component for Hotels.com
    iconColor: "icons.hotels",
    action: "Add",
    sourceType: SOURCE_TYPE.HOTELS,
    isLocked: true,
  },
  {
    title: "RyanAir",
    icon: <RyanAirIcon />, // Replace with the actual icon component for RyanAir
    iconColor: "icons.ryanair",
    action: "Add",
    sourceType: SOURCE_TYPE.RYANAIR,
    isLocked: true,
  },
  {
    title: "SkyScanner",
    icon: <SkyScannerIcon />, // Replace with the actual icon component for SkyScanner
    iconColor: "icons.skyscanner",
    action: "Add",
    sourceType: SOURCE_TYPE.SKYSCANNER,
    isLocked: true,
  },
  {
    title: "easyJet",
    icon: <EasyJetIcon />, // Replace with the actual icon component for easyJet
    iconColor: "icons.easyjet",
    action: "Add",
    sourceType: SOURCE_TYPE.EASYJET,
    isLocked: true,
  },
  {
    title: "Kickstarter",
    icon: <KickstarterIcon />, // Replace with the actual icon component for Kickstarter
    iconColor: "icons.kickstarter",
    action: "Add",
    sourceType: SOURCE_TYPE.KICKSTARTER,
    isLocked: true,
  },
  {
    title: "SimilarWeb",
    icon: <SimilarWebIcon />, // Replace with the actual icon component for SimilarWeb
    iconColor: "icons.similarweb",
    action: "Add",
    sourceType: SOURCE_TYPE.SIMILARWEB,
    isLocked: true,
  },
  {
    title: "Product Hunt",
    icon: <ProductHuntIcon />, // Replace with the actual icon component for Product Hunt
    iconColor: "icons.producthunt",
    action: "Add",
    sourceType: SOURCE_TYPE.PRODUCTHUNT,
    isLocked: true,
  },
  {
    title: "Amazon",
    icon: <AmazonIcon />, // Replace with the actual icon component for Amazon
    iconColor: "icons.amazon",
    action: "Add",
    sourceType: SOURCE_TYPE.AMAZON,
    isLocked: true,
  },
  {
    title: "Alibaba",
    icon: <AlibabaIcon />, // Replace with the actual icon component for Alibaba
    iconColor: "icons.alibaba",
    action: "Add",
    sourceType: SOURCE_TYPE.ALIBABA,
    isLocked: true,
  },
  {
    title: "Aliexpress",
    icon: <AliexpressIcon />, // Replace with the actual icon component for Aliexpress
    iconColor: "icons.aliexpress",
    action: "Add",
    sourceType: SOURCE_TYPE.ALIEXPRESS,
    isLocked: true,
  },
  {
    title: "Temu",
    icon: <TemuIcon />, // Replace with the actual icon component for Temu
    iconColor: "icons.temu",
    action: "Add",
    sourceType: SOURCE_TYPE.TEMU,
    isLocked: true,
  },
  {
    title: "Shopify",
    icon: <ShopifyIcon />, // Replace with the actual icon component for Shopify
    iconColor: "icons.shopify",
    action: "Add",
    sourceType: SOURCE_TYPE.SHOPIFY,
    isLocked: true,
  },
  {
    title: "eBay",
    icon: <EbayIcon />, // Replace with the actual icon component for eBay
    iconColor: "icons.ebay",
    action: "Add",
    sourceType: SOURCE_TYPE.EBAY,
    isLocked: true,
  },
  {
    title: "Etsy",
    icon: <EtsyIcon />, // Replace with the actual icon component for Etsy
    iconColor: "icons.etsy",
    action: "Add",
    sourceType: SOURCE_TYPE.ETSY,
    isLocked: true,
  },
  {
    title: "Walmart",
    icon: <WalmartIcon />, // Replace with the actual icon component for Walmart
    iconColor: "icons.walmart",
    action: "Add",
    sourceType: SOURCE_TYPE.WALMART,
    isLocked: true,
  },
  {
    title: "Shein",
    icon: <SheinIcon />, // Replace with the actual icon component for Shein
    iconColor: "icons.shein",
    action: "Add",
    sourceType: SOURCE_TYPE.SHEIN,
    isLocked: true,
  },
  {
    title: "Nike",
    icon: <NikeIcon />, // Replace with the actual icon component for Nike
    iconColor: "icons.nike",
    action: "Add",
    sourceType: SOURCE_TYPE.NIKE,
    isLocked: true,
  },
  {
    title: "Asos",
    icon: <AsosIcon />, // Replace with the actual icon component for Asos
    iconColor: "icons.asos",
    action: "Add",
    sourceType: SOURCE_TYPE.ASOS,
    isLocked: true,
  },
  {
    title: "Zalando",
    icon: <ZalandoIcon />, // Replace with the actual icon component for Zalando
    iconColor: "icons.zalando",
    action: "Add",
    sourceType: SOURCE_TYPE.ZALANDO,
    isLocked: true,
  },
  {
    title: "Decathlon",
    icon: <DecathlonIcon />, // Replace with the actual icon component for Decathlon
    iconColor: "icons.decathlon",
    action: "Add",
    sourceType: SOURCE_TYPE.DECATHLON,
    isLocked: true,
  },
  {
    title: "BestBuy",
    icon: <BestBuyIcon />, // Replace with the actual icon component for BestBuy
    iconColor: "icons.bestbuy",
    action: "Add",
    sourceType: SOURCE_TYPE.BESTBUY,
    isLocked: true,
  },
  {
    title: "Hacker News",
    icon: <HackerNewsIcon />, // Replace with the actual icon component for Hacker News
    iconColor: "icons.hackernews",
    action: "Add",
    sourceType: SOURCE_TYPE.HACKERNEWS,
    isLocked: true,
  },
  {
    title: "Google Maps",
    icon: <GoogleMapsIcon />, // Replace with the actual icon component for Google Maps
    iconColor: "icons.googlemaps",
    action: "Add",
    sourceType: SOURCE_TYPE.GOOGLE_MAPS,
    isLocked: true,
  },
  {
    title: "TikTok",
    icon: <TikTokIcon />, // Replace with the actual icon component for TikTok
    iconColor: "icons.tiktok",
    action: "Add",
    sourceType: SOURCE_TYPE.TIKTOK,
    isLocked: true,
  },
  {
    title: "Facebook",
    icon: <FacebookIcon />, // Replace with the actual icon component for Facebook
    iconColor: "icons.facebook",
    action: "Add",
    sourceType: SOURCE_TYPE.FACEBOOK,
    isLocked: true,
  },
  {
    title: "Instagram",
    icon: <InstagramIcon />, // Replace with the actual icon component for Instagram
    iconColor: "icons.instagram",
    action: "Add",
    sourceType: SOURCE_TYPE.INSTAGRAM,
    isLocked: true,
  },
  {
    title: "WhatsApp",
    icon: <WhatsAppIcon />, // Replace with the actual icon component for WhatsApp
    iconColor: "icons.whatsapp",
    action: "Add",
    sourceType: SOURCE_TYPE.WHATSAPP,
    isLocked: true,
  },
  {
    title: "Meta Threads",
    icon: <MetaThreadsIcon />, // Assuming you have a MetaThreadsIcon
    iconColor: "icons.metathreads",
    action: "Add",
    sourceType: SOURCE_TYPE.META_THREADS,
    isLocked: true,
  },
  {
    title: "Quora",
    icon: <QuoraIcon />, // Replace with the actual icon component for Quora
    iconColor: "icons.quora",
    action: "Add",
    sourceType: SOURCE_TYPE.QUORA,
    isLocked: true,
  },
  {
    title: "Soccer Stats",
    icon: <SoccerStatsIcon />, // Assuming you have a SoccerStatsIcon
    iconColor: "icons.soccerstats",
    action: "Add",
    sourceType: SOURCE_TYPE.SOCCER_STATS,
    isLocked: true,
  },
  {
    title: "AllRecipes",
    icon: <AllRecipesIcon />, // Replace with the actual icon component for AllRecipes
    iconColor: "icons.allrecipes",
    action: "Add",
    sourceType: SOURCE_TYPE.ALLRECIPES,
    isLocked: true,
  },
  {
    title: "Eventbrite",
    icon: <EventbriteIcon />, // Replace with the actual icon component for Eventbrite
    iconColor: "icons.eventbrite",
    action: "Add",
    sourceType: SOURCE_TYPE.EVENTBRITE,
    isLocked: true,
  },
  {
    title: "GetYourGuide",
    icon: <GetYourGuideIcon />, // Replace with the actual icon component for GetYourGuide
    iconColor: "icons.getyourguide",
    action: "Add",
    sourceType: SOURCE_TYPE.GETYOURGUIDE,
    isLocked: true,
  },
  {
    title: "Spotify",
    icon: <SpotifyIcon />, // Replace with the actual icon component for Spotify
    iconColor: "icons.spotify",
    action: "Add",
    sourceType: SOURCE_TYPE.SPOTIFY,
    isLocked: true,
  },
  {
    title: "TrustPilot",
    icon: <TrustPilotIcon />,
    iconColor: "icons.trustpilot",
    action: "Add",
    sourceType: SOURCE_TYPE.TRUSTPILOT,
    isLocked: true,
  },
];

export const activesourceList = sourceList.filter((_) => !_.isLocked)