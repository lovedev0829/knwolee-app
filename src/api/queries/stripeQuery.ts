import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "./index";
import {
    getStripeInvoicesRequest,
    stripeGetRequest,
} from "../requests/stripeIndex";

export function useStripeGet() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["stripe"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return stripeGetRequest(token);
        },
        { enabled: false }
    );
}

export function useStripeInvoices() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery(
        ["stripe/invoices"],
        async () => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return getStripeInvoicesRequest(token);
        },
    );
}
