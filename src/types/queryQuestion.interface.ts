import { PanelOptionType } from "./panel";

export interface IQueryQuestion {
    id: string;
    question: string;
    answer: string;
    conversation: string;
    type: PanelOptionType;
    data: unknown;
    createdAt: string;
}