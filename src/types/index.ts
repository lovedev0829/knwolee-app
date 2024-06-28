export * from './setting.interface';
export * from './user.interface';
export * from './dashboardsummary.interface';

declare global {
    interface Window {
        tolt_referral?: string;
        dataLayer: any[];
    }

    interface Navigator {
        brave?: {
            isBrave: () => Promise<boolean>;
        };
    }
}
