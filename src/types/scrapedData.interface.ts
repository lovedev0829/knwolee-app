import { IPagination } from "src/api/queries/entityQuery";

export interface IDocRecordData {
    createdAt: string;
    content: [
        { 
            text: string;
            pageContent: string;
            metadata: unknown;
        }
    ];
    entityId: string;
    extractionDate: string;
    id: string;
    metadata: unknown;
    fileType: string;
    updatedAt: string;
}

export interface IGoogleHeadlineData {
    link: string;
    title: string;
    source: string;
    publishedAt: Date;
    content: string;
}

export interface IMediumData {
    url: string;
    title: string;
    description: string;
    links: string[];
    image: string;
    content: string;
    author: string;
    source: string;
    published: Date;
    ttr: number;
}

export interface IPDFData {
    url: string;
    content: string[];
}

export interface IThreadData {
    id: string;
    url: string;
    verified: boolean;
    username: string;
    fullname: string;
    images: string[];
    timestamp: Date;
    text: string;
    isPinned: boolean;
    isQuote: boolean;
    isRetweet: boolean;
    likes: number;
    replies: number;
    retweets: number;
    quotes: number;
    __IMTLENGTH__: number;
    __IMTINDEX__: number;
}

export interface ITweetData {
    id: string;
    url: string;
    urls: unknown[];
    origin: string;
    symbols: unknown[];
    user_id: string;
    hashtags: unknown[];
    startUrl: string;
    username: string;
    full_text: string;
    is_pinned: boolean;
    created_at: Date;
    is_retweet: boolean;
    view_count: number;
    quote_count: number;
    reply_count: number;
    is_truncated: boolean;
    quoted_tweet?: {
        id: string | null;
        url: string | null;
    };
    retweet_count: number;
    user_mentions: unknown[];
    favorite_count: number;
    is_quote_tweet: boolean;
    conversation_id: string;
}

export interface IURLData {
    url: string;
    title: string;
    description: string;
    links: string[];
    image: string;
    content: string;
    author: string;
    favicon?: string;
    source: string;
    published?: Date;
    ttr: number;
}
export interface ICODAData {
    url: string;
    title: string;
    description: string;
    links: string[];
    image: string;
    text: string;
    author: string;
    favicon?: string;
    source: string;
    published?: Date;
    ttr: number;
}

export interface IYouTubeData {
    author: string;
    description?: string;
    entityId: string;
    length: number;
    origin: string;
    publish_date: Date;
    source: string;
    title: string;
    transcript: string;
    url: string;
    view_count: number;
}


export type IRedditComment = {
    id: string;
    parsedId: string;
    url: string;
    parentId?: string;
    username: string;
    category: string;
    communityName: string;
    body: string;
    createdAt: string;
    scrapedAt: string;
    upVotes: number;
    numberOfreplies?: number;
    html: string | null;
    dataType: "comment";
  };
  
  export type IRedditPost = {
    id: string;
    entityId: string;
  
    parsedId: string;
    url: string;
    username: string;
    title: string;
    communityName: string;
    parsedCommunityName?: string;
    body: string;
    html: string | null;
    numberOfComments: number;
    flair: string;
    upVotes: number;
    isVideo: boolean;
    isAd: boolean;
    over18: boolean;
    createdAt: Date;
    scrapedAt: Date;
    dataType: "post";
    comments: IRedditComment;
  };

export type IGitbookData = {
    id: string;
    entityId: string;
    url: string
    createdAt: string;
    scrapedAt: string;
    content: [
        {
            pageContent: string;
            metadata: {
                source: string;
                title: string;
            };
        }
    ];
};

  export type OpenAICrawlMetadata = {
    loadedUrl: string;
    loadedTime: string;
    referrerUrl: string;
    depth: number;
    httpStatusCode: number;
  };
  
  export type OpenAIMetadata = {
    canonicalUrl: string;
    title: string;
    description: string;
    author: null | string;
    keywords: string;
    languageCode: string;
  };
  
  export type OpenAIData = {
    entityId: string;
    url: string;
    crawl: {
      loadedUrl: string;
      loadedTime: string;
      referrerUrl: string;
      depth: number;
      httpStatusCode: number;
    };
    metadata: OpenAIMetadata;
    screenshotUrl: null | string;
    text: string;
  };
  
  // Define the interface for the Reddit document
  
type GithubFile = {
    pageContent: string;
    metadata: {
      source: string;
    };
  };
  
  type IGithub = {
    id: string;
    url: string;
    entityId: string;
    createdAt: Date;
    scrapedAt: Date;
    // extra types added because dynamically loading files
    // content: GithubFile[];
    content: { _id: string; total: number; file: GithubFile }[]  ;
  };
  
export type IGithubDocument = IGithub & IPagination;



interface IBubblemapsLink {
  backward: number;
  forward: number;
  source: number;
  target: number;
}

interface IBubblemapsMetadata {
  max_amount: number;
  min_amount: number;
}

interface IBubblemapsNode {
  address: string;
  amount: number;
  is_contract: boolean;
  name: string;
  percentage: number;
  transaction_count: number;
  transfer_X721_count: number | null;
  transfer_count: number;
}

interface IBubblemapsTokenLink {
  address: string;
  decimals?: number;
  links: IBubblemapsLink[];
  name: string;
  symbol: string;
}

export interface IBubblemapsData {
  entityId: string;
  chain: string;
  dt_update: string;
  full_name: string;
  id: string;
  is_X721: boolean;
  links: IBubblemapsLink[];
  metadata: IBubblemapsMetadata;
  nodes: IBubblemapsNode[];
  source_id: number;
  symbol: string;
  token_address: string;
  token_links: IBubblemapsTokenLink[];
  top_500: boolean;
  version: number;
}

export interface ICarbonScrapedData {
  _id: string;
  createdAt: string;
  entityId: string;
  id: string;
  text: string;
  updatedAt: string;
}

export type IGoogleDriveScrapedData = {
  _id: string;
  createdAt: string;
  entityId: string;
  id: string;
  text: string;
  title: string;
  updatedAt: string;
}

export type IOneDriveScrapedData = {
  _id: string;
  createdAt: string;
  entityId: string;
  id: string;
  itemId: string;
  text: string;
  updatedAt: string;
};

export interface LinkedInJobData {
  id: string;
  link: string;
  title: string;
  companyName: string;
  location: string;
  salaryInfo: string[];
  postedAt: string;
  benefits: string[];
  descriptionHtml: string;
  applicantsCount: string;
  applyUrl: string;
  descriptionText: string;
  seniorityLevel: string;
  employmentType: string;
  jobFunction: string;
  industries: string;
  companyWebsite: string;
}

export type ILinkedInJobDocument = {
  entityId: string;
  jobs: LinkedInJobData[];
  url: string;
}
