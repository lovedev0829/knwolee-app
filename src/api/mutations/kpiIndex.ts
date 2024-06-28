import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { GenerateKpiPayload, generateKpiRequest } from "../requests/kpiIndex";

export const useGenerateKpiMutation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload?: GenerateKpiPayload) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return generateKpiRequest(token, payload);
        }, {
        onSuccess: () => {
            ////console.log("success");
        },
    }
    );
};