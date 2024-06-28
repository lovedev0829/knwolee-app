export interface SummaryItem {
    imageUrl: string;
    title: string;
    sourceType: string;
    entityId: string;
    url?: string;
}

export interface Dashboardsummary {
    id: string;
    auth0Id: string;
    email: string;
    userId: string;
    news: SummaryItem[];
}

export interface Dashboardrecent {
    _id: string,
    id: string;
    value: string;
    createdAt: string;
    isScraped: boolean;
    sourceType: string;
    subSetType: string;
}
