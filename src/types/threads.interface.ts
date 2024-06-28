import { MetaDataWithType, PanelOptionType } from "./panel";

export type ThreadMessage = {
    id: string;
    object: string; // Always 'thread.message'
    created_at: number; // Unix timestamp in seconds
    thread_id: string;
    role: 'user' | 'assistant';
    content: ThreadMessageContent[]; // Array of text and/or images
    assistant_id?: string | null;
    run_id?: string | null;
    file_ids: string[]; // List of file IDs (maximum 10)
    metadata: MetaDataWithType<PanelOptionType>; // Set of 16 key-value pairs
  }


// export type ThreadMessageContent = (string | ImageFile | TextContent )
export type ThreadMessageContent = TextContent

type ImageFile = {
    type: 'image_file';
    image_file: Image; // You can define the structure of the image_file object if needed
};

type Image = {
    file_id: string
}

type TextContent = {
    type: 'text';
    text: {
        value: string; // The data that makes up the text
        annotations?: unknown[]; // Array of annotations (type can vary)
    };
};


