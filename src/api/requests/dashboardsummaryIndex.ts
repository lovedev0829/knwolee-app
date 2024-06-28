import { ServerResponse, apiRequest } from "./client";
import { Dashboardrecent, Dashboardsummary } from "src/types";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const getDashboardsummary = async (userAuth0Id: string, token: string): Promise<Dashboardsummary | null> => {
    const res = await apiRequest<ServerResponse<Dashboardsummary>>('get', `dashboardsummary/${userAuth0Id}`, token);

    if (!res.data.success) return null;
    return res.data.result;
};

export const getDashboardrecent = async (userAuth0Id: string, token: string): Promise<Dashboardrecent[] | null> => {
    const res = await apiRequest<ServerResponse<Dashboardrecent[]>>('get', `dashboardsummary/recent/${userAuth0Id}`, token);

    if (!res.data.success) return null;
    return res.data.result;
};