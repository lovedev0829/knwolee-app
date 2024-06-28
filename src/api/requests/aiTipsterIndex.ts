import { AITipsterUpcomingFixture } from "src/types/aiTipster.interface";
import { ServerResponse, apiRequest } from "./client";

export const getFixtureUpcoming = async ( token: string) => {
    const res = await apiRequest<ServerResponse<AITipsterUpcomingFixture>>('get', `football/sportFixturesByDate`, token);

    if (!res.data.success) return null;
    return res.data.result;
};

