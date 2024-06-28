export type Professions = {
  market: boolean;
  content: boolean;
  news: boolean;
  pm: boolean;
  education: boolean;
};

export type Goals = {
  realtimeInsights: boolean;
  summarizeInformation: boolean;
  generateContent: boolean;
  projectManagement: boolean;
  personalGrowth: boolean;
};

export type Support = {
  insights: boolean;
  automation: boolean;
  creativity: boolean;
  summaries: boolean;
};

export type SegmentationQuestions = {
  professions?: keyof Professions;
  goals: Goals;
  support: Support;
};

export type SegmentationRoleWithUsername = {
    username: string;
    professions?: keyof Professions;
}

export type NewSegmentationPayload = {
  professions: string;
}

export type UserSegmentation = {
  questions: SegmentationQuestions
};

type ValueOf<T> = T[keyof T];

export type QuestionKey = keyof SegmentationQuestions;

export type QuestionSegmentKeys = ValueOf<{
  [K in QuestionKey]: keyof SegmentationQuestions[K];
}>;

export type QuestionErrors = {
  [K in QuestionKey]: string;
};

export interface CategoryText<T> {
  title: string;
  values: {
    [K in keyof T]: string;
  };
}

export interface SegmentationTextStructure {
  goals: CategoryText<Goals>;
  support: CategoryText<Support>;
}

export type SegmentationQuestionKey = keyof SegmentationTextStructure;
