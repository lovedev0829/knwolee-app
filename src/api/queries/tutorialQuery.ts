import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "./index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getTutorialsRequest } from "../requests/tutorialIndex";
import { TutorialItem } from "src/types/tutorial.interface";

export function useTutorials() {
    const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    return useQuery<TutorialItem[], AxiosError>(["tutorial"], async () => {
        const token = await getToken(
            getAccessTokenSilently,
            getAccessTokenWithPopup
        );
        if (!token) throw new Error("Failed to get token");
        return getTutorialsRequest(token);
    });
}
