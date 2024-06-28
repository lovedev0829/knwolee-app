export interface ThirdPartyConfig {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  [provider: string]: any;  // This line allows dynamic access with string keys.
  google?: {
    token?: {
      access_token?: string;
      expiry_date?: number;
      scope?: string;
      token_type?: string;
    };
  };
  microsoft?: {
    token?: {
      access_token?: string;
      expires_in?: number;
      ext_expires_in?: number;
      scope?: string;
      token_type?: string;
    };
  };
  linkedin?: {
    token?: {
      access_token?: string;
      expires_in?: number;
      ext_expires_in?: number;
      scope?: string;
      token_type?: string;
    };
  };
  twitter?: {
    token?: {
      access_token?: string;
      expiry_date?: number;
      scope?: string;
      token_type?: string;
    };
  };
  medium?: {
    token?: {
      access_token?: string;
    };
  };
  slack?: {
    token?: {
      access_token?: string;
      expires_in?: number;
      ext_expires_in?: number;
      scope?: string;
      token_type?: string;
    };
  };
  trello?: {
    token?: {
      access_token: string;
      access_token_secret: string;
      oauth_token: string;
      oauth_token_secret: string;
      updatedAt: string;
    };
  };
  notion?: {
    token?: {
      access_token?: string;
    };
  };
  openai?: {
    apiKey?: string;
    updatedAt: string;
  };
  telegram?: {
    token?: {
      access_token?: string;
      updatedAt: string;
    };
    botId?: string;
    assistant_id?: string;
  };
}
