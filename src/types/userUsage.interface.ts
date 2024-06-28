export interface IUserUsageStat {
  _id: string;
  createdAt: string;
  credit?: {
    total: number;
    used: number;
  };
  entityCount: IEntityCount;
  localEntityCount: number;
  speechToTextCount: number;
  textToAudioCount: number;
  textToImage: {
    dalle3Count: number;
    sdxlCount: number;
  };
  textToVideoCount: number;
  tokenUsed: number;
  totalEmbeddingTokenUsed: number;
  totalRunTokenUsed: number;
  updatedAt: string;
  userAgentCount: number;
  userId: string;
  userThreadCount: number;
}

export interface IEntityCount {
  [key: string]: {
    [key: string]: number
  };
}

// export interface IEntityCount {
//   "youtube": {
//     "account": number;
//     "video": number;
//   };
//   "twitter": {
//     "tweet": number;
//     "thread": number;
//     "profile": number;
//     "cashtag": number;
//     "hashtag": number;
//   };
//   "medium": {
//     "article": number;
//     "account": number;
//   };
//   "news": {
//     "keyword": number;
//     "url": number;
//   };
//   "pdf": {
//     "url": number;
//   };
//   "url": {
//     "url": number;
//   };
//   "coda": {
//     "url": number;
//   };
// }
