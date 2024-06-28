import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from ".";
import { useQuery } from "@tanstack/react-query";
import {
    getFreeSubscriptionPlanRequest,
    getStatsPriceRequest,
    getSubscriptionsDataRequest,
    getUserSubscriptionRequest,
} from "../requests/subscriptionIndex";

export function useGetSubscriptions() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["subscriptions"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getSubscriptionsDataRequest(token);
        }
    );
}

export function useGetUserSubscription() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["subscriptions", "user-subscription"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getUserSubscriptionRequest(token);
        }
    );
}

export function useFreeSubscriptionPlan() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["subscriptions", "free-subscription-plan"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getFreeSubscriptionPlanRequest(token);
    });
}

export function useStatsPrice() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(["subscriptions", "stats-price"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getStatsPriceRequest(token);
    });
}
