export interface UserProcess {
    _id: string;
    avatar: {
        name:string,
        color:string
    };
    creatorId: string;
    goals: [{ goal: string; assistantId: string }];
    interval?: string;
    isDefault: boolean;
    isRecurring?: boolean;
    jobId?: string;
    name: string;
    runs?: number;
    scheduledAt?: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    threadIds?: string[];
}
