import { ServerResponse, apiRequest } from "./client";
import {
    IStatsPrice,
    SubscriptionPlan,
    SubscriptionsResponse,
    UserSubscriptionsResponse,
} from "src/types/subscription.interface";

export const getSubscriptionsDataRequest = async (
    token: string,
) => {
    const res = await apiRequest<ServerResponse<SubscriptionsResponse[]>>(
        "GET",
        `subscriptions`,
        token
    );
    return res.data.result;
};

export const getUserSubscriptionRequest = async (
    token: string,
) => {
    const res = await apiRequest<ServerResponse<UserSubscriptionsResponse>>(
        "GET",
        `subscriptions/user-subscription`,
        token
    );
    return res.data.result;
};

export const getFreeSubscriptionPlanRequest = async (token: string) => {
    const res = await apiRequest<ServerResponse<SubscriptionPlan>>(
        "GET",
        `subscriptions/free-subscription-plan`,
        token
    );
    return res.data.result;
};

export const getStatsPriceRequest = async (token: string) => {
    const res = await apiRequest<ServerResponse<IStatsPrice>>(
        "GET",
        `subscriptions/stats-price`,
        token
    );
    return res.data.result;
};
