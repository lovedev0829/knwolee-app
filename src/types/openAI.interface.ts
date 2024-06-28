import { FunctionDefinition } from "openai/resources/shared.mjs";

export interface OpenAIFunction {
    createdAt: string;
    updatedAt: string;
    functionDefinition: FunctionDefinition;
    label: string;
    onlySuperAdmin: boolean;
    id: string;
    _id: string;
}

export interface OpenAIFunctionDeWithType extends OpenAIFunction {
    functionType: string,
}

export interface OpenAIFunctionWithGrouping {
    data: [OpenAIFunctionDeWithType],
    functionType: string,
}
