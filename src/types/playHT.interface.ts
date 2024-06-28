export interface IPlayHTVoice {
    value: string;
    name: string;
    language: string;
    voiceType: string;
    languageCode: string;
    gender: string;
    service: string;
    sample: string;
    styles?: string[];
    isKid?: boolean;
    isNew?: boolean;
}

export interface IPlayHTClonedVoice {
    id: string;
    name: string;
    type: string;
}

export interface IplayHTGetVoicesResponse {
    voices: IPlayHTVoice[]
}