import { PlanDuration, PlanType } from "src/api/requests/stripeIndex";

export interface StripeSubscription {
    id: string;
    object: string;
    application: null | string; // Replace 'string' with the actual type if known
    application_fee_percent: null | number;
    automatic_tax: {
        enabled: boolean;
    };
    billing_cycle_anchor: number;
    billing_thresholds: null | {
        amount_gte: number;
        reset_billing_cycle_anchor?: boolean;
    };
    cancel_at: null | number;
    cancel_at_period_end: boolean;
    canceled_at: null | number;
    cancellation_details: {
        comment: null | string;
        feedback: null | string;
        reason: null | string;
    };
    collection_method: string;
    created: number;
    currency: string;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    days_until_due: null | number;
    default_payment_method: null | string;
    default_source: null | string;
    default_tax_rates: string[];
    description: null | string;
    discount: null | unknown; // Replace 'unknown' with the actual type if known
    ended_at: null | number;
    items: {
        object: string;
        data: Array<{
            id: string;
            object: string;
            billing_thresholds: null | unknown; // Replace 'unknown' with the actual type if known
            created: number;
            metadata: Record<string, unknown>; // Replace 'unknown' with the actual type if known
            plan: {
                id: string;
                object: string;
                active: boolean;
                aggregate_usage: null | unknown; // Replace 'unknown' with the actual type if known
                amount: number;
                amount_decimal: string;
                billing_scheme: string;
                created: number;
                currency: string;
                interval: string;
                interval_count: number;
                livemode: boolean;
                metadata: Record<string, unknown>; // Replace 'unknown' with the actual type if known
                nickname: null | string;
                product: string;
                tiers_mode: null | unknown; // Replace 'unknown' with the actual type if known
                transform_usage: null | unknown; // Replace 'unknown' with the actual type if known
                trial_period_days: null | number;
                usage_type: string;
            };
            price: {
                id: string;
                object: string;
                active: boolean;
                billing_scheme: string;
                created: number;
                currency: string;
                custom_unit_amount: null | unknown; // Replace 'unknown' with the actual type if known
                livemode: boolean;
                lookup_key: null | string;
                metadata: Record<string, unknown>; // Replace 'unknown' with the actual type if known
                nickname: null | string;
                product: string;
                recurring: {
                    aggregate_usage: null | unknown; // Replace 'unknown' with the actual type if known
                    interval: string;
                    interval_count: number;
                    trial_period_days: null | number;
                    usage_type: string;
                };
                tax_behavior: string;
                tiers_mode: null | unknown; // Replace 'unknown' with the actual type if known
                transform_quantity: null | unknown; // Replace 'unknown' with the actual type if known
                type: string;
                unit_amount: number;
                unit_amount_decimal: string;
            };
            quantity: number;
            subscription: string;
            tax_rates: string[];
        }>;
        has_more: boolean;
        total_count: number;
        url: string;
    };
    latest_invoice: string;
    livemode: boolean;
    metadata: Record<string, unknown>; // Replace 'unknown' with the actual type if known
    next_pending_invoice_item_invoice: null | unknown; // Replace 'unknown' with the actual type if known
    on_behalf_of: null | string;
    pause_collection: null | unknown; // Replace 'unknown' with the actual type if known
    payment_settings: {
        payment_method_options: null | unknown; // Replace 'unknown' with the actual type if known
        payment_method_types: null | unknown; // Replace 'unknown' with the actual type if known
        save_default_payment_method: string;
    };
    pending_invoice_item_interval: null | unknown; // Replace 'unknown' with the actual type if known
    pending_setup_intent: null | unknown; // Replace 'unknown' with the actual type if known
    pending_update: null | unknown; // Replace 'unknown' with the actual type if known
    quantity: number;
    schedule: null | unknown; // Replace 'unknown' with the actual type if known
    start_date: number;
    status: string;
    test_clock: null | unknown; // Replace 'unknown' with the actual type if known
    transfer_data: null | unknown; // Replace 'unknown' with the actual type if known
    trial_end: null | number;
    trial_settings: {
        end_behavior: {
            missing_payment_method: string;
        };
    };
    trial_start: null | number;
}

export type StripeSubscriptionStatus =
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "paused"
    | "trialing"
    | "unpaid";

export interface SubscriptionPlanFeatures {
    maxTokens: number;
    maxLocalFileSourceCount: number;
    maxStaticDataSourceCount: number;
    maxDynamicDataSourceCount: number;
    maxUserAgentCount: number;
    maxImageInterpretationCount: number;
    maxTextToImageCount: number;
    maxTextToVideoCount: number;
    speechToTextCount: {
        maxCount?: number;
        unlimited: boolean;
    }
}

export interface SubscriptionFeature {
    name: string;
    price: number;
    fullprice: number;
    features: SubscriptionPlanFeatures;
    available_openai_models: Array<string>;
    additionalPerks: string;
    subscriptionPlan: string;
    interval: PlanDuration;
    planType: PlanType;
    priority: number;
    livemode: boolean;
}

export interface UserSubscription {
    createdAt: string;
    userId: string;
    plan: SubscriptionFeature;
    hasTrial: boolean;
    startDate: string;
    endDate: string;
    canceledAt?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: string;
    status: StripeSubscriptionStatus;
    stripeProductId?: string;
    updatedAt: string;
}

export interface UserSubscriptionsResponse {
    userSubscription: UserSubscription;
    stripeSubscription: StripeSubscription;
}

export interface SubscriptionPlan {
    _id: string;
    interval: string;
    livemode: boolean;
    name: string;
    planType: string;
    openai_model: string;
    price: number;
    priority: number;
    stripeProductId: string;
    stripePriceId: string;
    subscriptionFeature: SubscriptionFeature;
}

export interface SubscriptionsResponse {
    _id: string;
    subscriptions: SubscriptionPlan[]
}

export interface IStatsPrice {
    _id: string;
    createdAt: string;
    features: {
        tokens: {
            unitCost: number;
            perUnit: number;
        };
        localFileSource: {
            unitCost: number;
        };
        staticDataSource: {
            unitCost: number;
        };
        dynamicDataSource: {
            unitCost: number;
        };
        userAgent: {
            unitCost: number;
        };
        imageInterpretation: {
            unitCost: number;
        };
        textToImage: {
            unitCost: number;
        };
        textToVideo: {
            unitCost: number;
        };
        speechToText: {
            unitCost: number;
        };
    };
    updatedAt: string;
}
