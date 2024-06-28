import { CategoryText, Professions, SegmentationTextStructure, UserSegmentation } from "../types/user.segmentation";

export const TWITTER_SUB_SET_TYPES = {
  SINGLE_STEP: {
    POST: "Tweet",
    THREAD: "Thread",
    RT: "Retweet",
  },
  SCHEDULED: {
    PROFILE: "Profile",
    HASHTAG: "Hashtag",
  },
};

export const NOTIFICATION_SETTINGS_OPTIONS = {
  NEW_NOTIFICATION: 'newNotification',
  CHAT_INVITATION: 'chatInvitation',
  MENTION: 'mention',
} as const;

export const PROFESSIONS_SEGMENTATION_TEXT: CategoryText<Professions> = {
  title: "What's your primary profession or interest area?",
  values: {
    market: "📈 Market Analysis",
    content: "🌌 Content Creation",
    news: "📰 News Consumption",
    pm: "🏪 Project Management",
    education: "🧑\u200D🏫 Education and Training",
  },
};

export const SEGMENTATION_TEXT: SegmentationTextStructure = {
  goals: {
    title: "What do you aim to achieve with Knowlee?",
    values: {
      realtimeInsights: "✨ Stay updated with real-time insights and trends",
      summarizeInformation: "🧩 Summarize and simplify complex information",
      generateContent:
        "💎 Generate engaging promotional or educational content",
      projectManagement: "📅 Streamline project management",
      personalGrowth: "🧑\u200D🏫 Personal growth and learning",
    },
  },
  support: {
    title: "How do you want Knowlee to assist you?",
    values: {
      insights: "💡 Provide actionable insights",
      automation: "🤖 Automate repetitive tasks",
      creativity: "🎨 Enhance creativity and content generation",
      summaries: "📋 Compile daily summaries and recaps",
    },
  },
};

export const DEFAULT_USER_SEGMENTATION: UserSegmentation = {
  questions: {
    professions: undefined,
    goals: {
      realtimeInsights: false,
      summarizeInformation: false,
      generateContent: false,
      projectManagement: false,
      personalGrowth: false,
    },
    support: {
      insights: false,
      automation: false,
      creativity: false,
      summaries: false,
    },
  },
} as const;

export const twitterSubSetTypes = [
  { value: "tweet", label: "Tweet" },
  { value: "thread", label: "Thread" },
  // {value:"retweet", label:"Retweet"},
  { value: "profile", label: "Profile", badge: "Paused", disabled: true, colorScheme: "yellow" },
  { value: "hashtag", label: "Hashtag (#)", badge: "Paused", disabled: true, colorScheme: "yellow" },
];

export const UPLOAD_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
} as const

export const youtubeSubSetTypes = [
  { value: "video", label: "Video", badge: "" }, 
  { value: "account", label: "Account", badge: "Multi-Step", colorScheme: "purple" }, 
];

export const mediumSubSetTypes = [
  { value: "article", label: "Article" },
  { value: "account", label: "Account", badge: "Multi-Step", colorScheme: "purple" },
];

export const pdfSubSetTypes = [
  { value: "url", label: "URL" },
];

export const newsSubSetTypes = [
  { value: "url", label: "URL" },
  { value: "keyword", label: "Keyword", badge: "Multi-Step", colorScheme: "purple" },
];

export const artemisSubSetTypes = [
  { value: "keyword", label: "Keyword" },
];

export const urlSubSetTypes = [
  { value: "url", label: "URL" },
];

export const codaSubSetTypes = [
  { value: "url", label: "URL" },
];

export const bubblemapsSubSetTypes = [
  { value: "eth", label: "Ethereum" },
  { value: "bsc", label: "BSC" },
  { value: "avax", label: "Avalanche" },
  { value: "arbi", label: "Arbitrum" },
  { value: "poly", label: "Polygon" },
];

export const redditSubSetTypes = [
  { value: "url", label: "URL" },
];

export const gitbookSubSetTypes = [  
  { value: "url", label: "URL" },
];

export const openAISubSetTypes = [
  { value: "url", label: "URL" },
];

export const githubSubSetTypes = [
  { value: "url", label: "URL" },
];

export const linkedInSubSetTypes = [
  { value: "url", label: "URL" },
];

// sourceList.filter((_) => !_.isLocked)
interface ISourceToSourceSubset {
  [key: string]: { value: string; label: string }[];
}
export const activeSubsetType: ISourceToSourceSubset = {
  youtube: youtubeSubSetTypes,
  twitter: twitterSubSetTypes,
  medium: mediumSubSetTypes,
  news: newsSubSetTypes,
  pdf: pdfSubSetTypes,
  url: urlSubSetTypes,
  coda: codaSubSetTypes,
  reddit: redditSubSetTypes,
  gitbook: gitbookSubSetTypes,
  github: githubSubSetTypes,
  openai: openAISubSetTypes,
  bubblemaps: bubblemapsSubSetTypes,
};

export const entityStatus = [
  {
    label: "Multi-Step",
    value: "multi-step",
  },
  {
    label: "Learned",
    value: "learned",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "No data",
    value: "no-data",
  },
  // {
  //   label: "Data Found",
  //   value: "data-found",
  // },
  // {
  //   label: "Error",
  //   value: "error",
  // },
];

export const defaultInitialPrompts = [
  "Give me an overview of the platform.",
  "What are your main capabilities?",
  "How do I upload my knowledge sources?",
  "How to create and set tasks for my AI assistants?",
];