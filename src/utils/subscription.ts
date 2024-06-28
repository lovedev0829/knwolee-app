import { PlanDuration, PlanType } from "src/api/requests/stripeIndex";

export interface ISubscriptionFeature {
    name: string;
    price: number;
    features: {
        max_tokens: number;
        twitter_source: number;
        medium_source: number;
        news_source: number;
        nansen_source: number;
    };
    interval: PlanDuration;
    planType: PlanType;
    additionalPerks: string;
    subscriptionPlan: string;
}

export interface ISubscriptionPlan {
    livemode: boolean;
    stripeProductId: string;
    stripePriceId: string;
    subscriptionFeature: ISubscriptionFeature;
}


export interface SubscriptionsResponse {
    _id: string;
    subscriptions: ISubscriptionPlan[]
}