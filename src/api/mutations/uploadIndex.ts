import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "../queries";
import { uploadImageForImageInterpretationRequest } from "../requests/uploadIndex";


export const useUploadImageForInterpretation = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return useMutation(
        async (payload: FormData) => {
            const token = await getToken(
                getAccessTokenSilently,
                getAccessTokenWithPopup
            );
            if (!token) throw new Error("Failed to get token");
            return uploadImageForImageInterpretationRequest(token, payload);
        }, {
        onSuccess: () => {
            //console.log("success");
        },
    }
    );
};