import { useCallback, useMemo } from "react";
import {
    useGetUserSubscription,
    useStatsPrice,
} from "src/api/queries/subscriptionQuery";
import { useUserUsageStats } from "src/api/queries/userUsageQuery";

function useUsageStat() {
    const { data: userSubsriptionRes } = useGetUserSubscription();
    const { data: userUsageStat } = useUserUsageStats();
    const { data: statsPrice } = useStatsPrice();

    const getRemainingTokens = useCallback(() => {
        if (!userUsageStat || !userSubsriptionRes) {
            return 0;
        }
        const { tokenUsed = 0, totalRunTokenUsed = 0, credit } = userUsageStat;
        const { plan } = userSubsriptionRes.userSubscription;
        if (typeof plan === "string") return 0;

        // maximum tokens based on subscription plan
        let subscriptionPlanMaxTokens = plan?.features?.maxTokens || 0;

        // check for credit
        if (credit && statsPrice) {
            const { total, used } = credit;
            if (total > used) {
                const remainingCredit = total - used;
                const { perUnit = 0, unitCost = 1 } =
                    statsPrice?.features?.tokens || {};
                // calculate remaining credit tokens
                const remainingCreditTokens = remainingCredit * (perUnit / unitCost);
                // add remaining credit tokens to subscription max tokens
                subscriptionPlanMaxTokens += remainingCreditTokens;
            }
        }

        // total tokens used
        const usedTokens = tokenUsed + totalRunTokenUsed;

        if (usedTokens >= subscriptionPlanMaxTokens) {
            return 0;
        }
        return subscriptionPlanMaxTokens - usedTokens;
    }, [statsPrice, userSubsriptionRes, userUsageStat])

    const remainingTokens = useMemo(() => {
        return getRemainingTokens();
    }, [getRemainingTokens]);

    return { getRemainingTokens, remainingTokens };
}

export default useUsageStat;
