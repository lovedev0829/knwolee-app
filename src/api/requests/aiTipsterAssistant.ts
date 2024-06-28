import { ServerResponse, apiRequest } from "./client";

export interface CreateFixtureAgentPayload {
    team_home_name: string;
    team_away_name: string;
    fixture_id: number;
    team_away_id: number;
    team_home_id: number;
}

  export interface AddMessagePayload {
    threadId?: string,
    textMessage: string,
    shouldRun: boolean,
    assistantId?: string,
    title: string
  }

export async function createFixtureAgentRequest(
    token: string,
    payload?: CreateFixtureAgentPayload
){
    if (!payload) {
        console.error('Payload is required for createFixtureAgentRequest');
        return null;
    }

    const res = await apiRequest<ServerResponse< string>>(
        "POST",
        `football/fixtureAgent`,
        token,
        payload
    );

    return res.data.result;
}