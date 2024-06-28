/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useSubscriptionModalStore } from 'src/store';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const serverURL = import.meta.env.VITE_APP_SERVER_URL;
// const serverURL = "https://node-weather-app-dev.onrender.com/";

export interface ServerResponse<T> {
  message: string;
  result: T;
  success: boolean;
}


const client = axios.create({
  baseURL: `${serverURL}api/`,
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
    function (error) {
      // debugger
      const errorResponse = error as AxiosError<ServerResponse<unknown>>;
     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error && error.response && error.response.status === 402) {
        // Open subscription limit model open
        useSubscriptionModalStore.setState({ isOpen: true });
      }
      // else if (error && error.response && error.response.status === 200) {
      else if (
        errorResponse?.response?.status === 502 ||
        errorResponse?.response?.status === 503 ||
        errorResponse?.response?.status === 504 ||
        (errorResponse?.code === "ERR_NETWORK" && errorResponse.response)
      ) {
        errorResponse.response.data.message = "Please wait a moment. We're working on it.";
      }
    return Promise.reject(error);
  }
);

export async function apiRequest<T>(method: string, url: string, token: string, data?: any, restConfig?: any): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    method: method as Method,
    url,
    data,
    headers: { Authorization: `Bearer ${token}` },
    ...restConfig,
  };

  return client(config);
}

export default client;
