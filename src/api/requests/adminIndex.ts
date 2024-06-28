import { ServerResponse, apiRequest } from "./client";

export type adminDashboardStats = {
    userRegistered: number;
    userWithSourcesGreaterThan1: number;
    userWithTokenUsageMoreThan1: number;
    userLoggedin24h: number;
    userWithTokenUsageMoreThan250: number;
    averageTokenUsagePerCustomer: number;
};

export type DeleteSourcePayload = {
    userId: string;
    entityId: string;
}

export async function getAdminDashboardStatsRequest(token: string) {
    const res = await apiRequest<ServerResponse<adminDashboardStats>>(
        "GET",
        `admin/dashboard-stats`,
        token
    );
    return res.data.result;
}

export async function deleteUserAdminRequest(token: string, userId: string) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "DELETE",
        `admin/user/${userId}`,
        token
    );
    return res.data.result;
}

export async function deleteSourceAdminRequest(
    token: string,
    { userId, entityId }: DeleteSourcePayload
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "DELETE",
        `admin/user/${userId}/entity/${entityId}`,
        token
    );
    return res?.data;
}

export async function deleteUnusedVectorAdminRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "DELETE",
        `admin/unused-vectors`,
        token
    );
    return res?.data;
}

export async function cleanupUserKnowledgeAdminRequest(
    token: string,
) {
    const res = await apiRequest<ServerResponse<unknown>>(
        "DELETE",
        `admin/cleanup-userknowledges`,
        token
    );
    return res?.data;
}
