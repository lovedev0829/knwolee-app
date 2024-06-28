import { StripeSubscription } from "src/types/subscription.interface";
import { ServerResponse, apiRequest } from "./client";

export type PlanDuration = "monthly" | "yearly";
export type ModelType = "GPT 3.5 Turbo" | "GPT 4o";
export type PlanType = "basic" | "pro" | "FREE";

export type BillingReason =
    | "automatic_pending_invoice_item_invoice"
    | "manual"
    | "quote_accept"
    | "subscription"
    | "subscription_create"
    | "subscription_cycle"
    | "subscription_threshold"
    | "subscription_update"
    | "upcoming";

export type StripeInvoiceStatus = "draft" | "open" | "paid" | "uncollectible" | "void";

export interface StripeInvoice {
    id: string;
    object: "invoice";
    account_country: string | null;
    account_name: string | null;
    account_tax_ids: Array<string> | null;
    amount_due: number;
    amount_paid: number;
    amount_remaining: number;
    amount_shipping: number;
    application: string | null;
    application_fee_amount: number | null;
    attempt_count: number;
    attempted: boolean;
    auto_advance?: boolean;
    automatic_tax: {
        enabled: boolean;
        status: "complete" | "failed" | "requires_location_inputs" | null;
    };
    billing_reason: BillingReason | null;
    created: number;
    currency: string;
    custom_fields: Array<{
        name: string;
        value: string;
    }> | null;
    customer: string | null;
    customer_email: string | null;
    customer_name: string | null;
    customer_phone: string | null;
    deleted?: void;
    description: string | null;
    discounts: Array<string> | null;
    due_date: number | null;
    effective_at: number | null;
    ending_balance: number | null;
    footer: string | null;
    hosted_invoice_url?: string;
    invoice_pdf?: string;
    livemode: boolean;
    metadata: {
        [name: string]: string;
    } | null;
    next_payment_attempt: number | null;
    number: string | null;
    on_behalf_of: string | null;
    paid: boolean;
    paid_out_of_band: boolean;
    payment_intent: string | null;
    period_end: number;
    period_start: number;
    post_payment_credit_notes_amount: number;
    pre_payment_credit_notes_amount: number;
    quote: string | null;
    receipt_number: string | null;
    starting_balance: number;
    statement_descriptor: string | null;
    status: StripeInvoiceStatus;
    subscription: string | null;
    subscription_proration_date?: number;
    subtotal: number;
    subtotal_excluding_tax: number | null;
    tax: number | null;
    test_clock: string | null;
    total: number;
    total_excluding_tax: number | null;
    webhooks_delivered_at: number | null;
}

export type StripeInvoiceResponse = {
    data: StripeInvoice[];
    has_more: boolean;
    object: string;
    url: string;
};

export type StripePaymentPayload = {
    planDuration?: PlanDuration,
    planType?: PlanType,
    priceId: string,
    tolt_referral?: string,
}

export type StripePaymentResponse = { url: string } | StripeSubscription;

export const stripeGetRequest = async (token: string) => {
    const res = await apiRequest<ServerResponse<{ url: string }>>(
        "GET",
        "/stripe",
        token
    );
    return res.data.result;
};


export const stripePaymentRequest = async (token: string, data: StripePaymentPayload) => {
    const res = await apiRequest<ServerResponse<StripePaymentResponse>>(
        "POST",
        "/stripe/payment",
        token,
        data,
    );
    return res.data.result;
};

export type IStripeBuyCreditsPayload = {
    tolt_referral?: string,
    quantity?: number,
}

export const buyCreditsRequest = async (token: string, data: IStripeBuyCreditsPayload) => {
    const res = await apiRequest<ServerResponse<StripePaymentResponse>>(
        "POST",
        "/stripe/credit-payment",
        token,
        data,
    );
    return res.data.result;
};

export const acceptSpecialDiscountOfferRequest = async (token: string) => {
    const res = await apiRequest<ServerResponse<StripePaymentResponse>>(
        "POST",
        "/stripe/apply-90-percent-discount",
        token
    );
    return res.data.result;
};

export const getStripeInvoicesRequest = async (token: string) => {
    const res = await apiRequest<ServerResponse<StripeInvoiceResponse>>(
        "GET",
        "/stripe/invoices",
        token
    );
    return res.data.result;
};
