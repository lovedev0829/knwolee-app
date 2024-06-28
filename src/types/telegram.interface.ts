export interface TelegramConfig {
    _id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    token: {
        access_token?: string;
        expires_at?: number;
        expires_in?: number;
        refresh_token?: string;
        scope?: string;
        token_type?: string;
    }
}