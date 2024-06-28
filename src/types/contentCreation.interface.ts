export type GeneratedFrom = "Custom" | "Dashboard" | "Evergreen";

export type ContentFormat = "tweet" | "thread" | "article" | "email" | "post";

export interface ITopic {
    _id: string
    contentFormats: ContentFormat[];
    createdAt: string;
    userId: string;
    topicTitle: string;
    generatedFrom: GeneratedFrom;
    updatedAt: string;
}

export type Topic = {
    contentFormats: ContentFormat[];
    userId: string;
    topicTitle: string;
    generatedFrom: GeneratedFrom;
}

export interface IContent {
    _id: string
    contentData: string;
    contentFormat: ContentFormat;
    contentTitle: string;
    createdAt: string;
    jobId?: string;
    metadata: unknown;
    scheduledAt?: string;
    updatedAt: string;
    userId: string;
}
