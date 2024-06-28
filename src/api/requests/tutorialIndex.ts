import { TutorialItem } from "src/types/tutorial.interface";
import { ServerResponse, apiRequest } from "./client";

export async function getTutorialsRequest(token: string) {
    const res = await apiRequest<ServerResponse<TutorialItem[]>>(
        "GET",
        "tutorial",
        token
    );
    return res.data.result;
}
