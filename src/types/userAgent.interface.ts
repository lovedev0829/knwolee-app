// import { Assistant, Thread } from "./openAI.interface";
import { Assistant, Thread } from "openai/resources/beta/index.mjs";

export type FunctionParameters = Record<string, unknown>;

export interface IOpenAIFunctionDefinition {
    createdAt: string;
    updatedAt: string;
    functionDefinition: {
        name: string;
        description?: string;
        parameters?: FunctionParameters;
    };
    label: string;
    onlySuperAdmin?: boolean;
}

export interface UserAgent {
    _id: string;
    avatar: {
        name: string,
        color: string
    },
    assistant: Assistant;
    // assistantId: string;
    createdAt: string;
    entityIds: string[];
    functionDefinitions?: string[];
    functionTypes?: string[];
    openai_model?: string;
    updatedAt: string;
    creatorId: string;
    initialPrompts: string[];
    isDefaultAgentAdded: boolean;
}

export type UserAgentWithFunctionDefinition = {
    functionDefinitions: IOpenAIFunctionDefinition[]
} & UserAgent

export type DefaultAgent = UserAgent

export interface UserThread {
    _id: string;
    title: string;
    createdAt: string;
    creatorId: string;
    thread: Thread;
    updatedAt: string;
}
