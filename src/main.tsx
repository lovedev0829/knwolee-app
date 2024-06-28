import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ColorModeScript } from '@chakra-ui/react'
import { isSafari, isFirefox } from "react-device-detect";

// react-slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

import Chats from "./pages/Chats";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/error-page";
import FeedTheBrain from "./pages/FeedTheBrain";
import Settings from "./pages/Settings";
import EditProfile from "./components/Settings/EditProfile";
import UpdatePassword from "./components/Settings/UpdatePassword";
import Notifications from "./components/Settings/Notifications";
import Preferences from "./components/Settings/Preferences";
import Billing from "./components/Settings/Billing";
import Action from "./components/Settings/Action";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import Root from "./routes/root";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./routes/auth.guard";
import axios from "axios";
import ChatWithDocument from "./pages/ChatWithDocument";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TextToAudioSettings from "./components/Settings/TextToAudioSettings";
import ConsentForm from "./pages/ConsentForm";
import CreatedContent from "./pages/ContentCreation/CreatedContent";
import MyTopics from "./pages/ContentCreation/MyTopics";
import TopicGenerator from "./pages/ContentCreation/TopicGenerator";
import CreatedInsight from "./pages/InsightCreation/CreatedInsight";
import MyKpis from "./pages/InsightCreation/MyKpis";
import InsightGenerator from "./pages/InsightCreation/InsightGenerator";
import KnowleeAgents from "./pages/KnowleeAgents/Index";
import MyAgents from "./pages/KnowleeAgents/MyAgents";
import AgentsStore from "./pages/KnowleeAgents/AgentsStore";
import CreateAgent from "./pages/KnowleeAgents/CreateAgent";
import AgentChat from "./pages/KnowleeAgents/AgentChat";
import UpdateAssistant from "./pages/KnowleeAgents/UpdateAssistant";
import MyProcesses from "./pages/KnowleeProcesses/MyProcesses";
import ProcessesStore from "./pages/KnowleeProcesses/ProcessesStore";
import CreateProcess from "./pages/KnowleeProcesses/CreateProcess";
import ProcessChat from "./pages/KnowleeProcesses/AgentChat";
import UpdateProcess from "./pages/KnowleeProcesses/UpdateProcess";
import AnnouncementBar from 'src/components/AnnouncementBar';
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import VideoGenerator from "./pages/VideoCreation/VideoGenerator";
import MyVideos from "./pages/VideoCreation/MyVideos";
import CreatedVideos from "./pages/VideoCreation/CreatedVideos";
import ThirdPartyConnectors from "./pages/ThirdPartyConnectors";
import KnowleeProcesses from "./pages/KnowleeProcesses/Index";
import AcceptAssistant from 'src/components/KnowleeAgents/AcceptAssistant';
import ApiKey from "./components/Settings/ApiKey";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const serverURL: string = import.meta.env.VITE_APP_SERVER_URL;
axios.defaults.baseURL = `${serverURL}api`;
axios.defaults.headers.common["Content-Type"] = "application/json"

const router = createBrowserRouter([
  {
    path: "/consentform",
    element: <ConsentForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AuthenticationGuard  component={Root} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate replace={true} to="dashboard" />,
      },
      {
        path: "connectors",
        element: <ThirdPartyConnectors />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "super-admin-dashboard",
        element: <SuperAdminDashboard />,
      },
      {
        path: "knowledge-sources",
        element: <FeedTheBrain />,
      },
      {
        path: "knowleechats",
        element: <AgentChat />,
      },
      {
        path: "knowleeagents",
        element: <Chats />,
      },
      {
        path: "knowleechats/:threadId",
        element: <AgentChat />,
      },
      // {
      //   path: "knowleechats",
      //   element: <Chats />,
      // },
      // {
      //   path: "knowleechats/document",
      //   element: <ChatWithDocument />,
      // },
      // {
      //   path: "knowleechats/:conversationId",
      //   element: <Chats />,
      // },
      {
        path: "knowlee-assistants",
        element: <KnowleeAgents />,
        children: [
          {
            element: <MyAgents />,
            index: true,
          },
          {
            path: "my-assistants",
            element: <MyAgents />,
          },
          {
            path: "assistants-store",
            element: <AgentsStore />,
          },
          {
            path: "create-assistant",
            element: <CreateAgent />,
          },
          // {
          //   path: "agent-chat",
          //   element: <AgentChat />,
          // },
          // {
          //   path: "agent-chat/:threadId",
          //   element: <AgentChat />,
          // },
          {
            path: "assistants/:assistantId",
            element: <UpdateAssistant />,
          },
        ],
      },
      {
        path: "knowlee-processes",
        element: <KnowleeProcesses />,
        children: [
          {
            element: <MyProcesses />,
            index: true,
          },
          {
            path: "my-processes",
            element: <MyProcesses />,
          },
          {
            path: "processes-store",
            element: <ProcessesStore />,
          },
          {
            path: "create-process",
            element: <CreateProcess />,
          },
          {
            path: ":processId",
            element: <UpdateProcess />,
          },
        ],
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
    },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "",
            element: <Navigate replace={true} to="profile" />,
          },
          {
            path: "profile",
            element: <EditProfile />
          },
          {
            path: "update-password",
            element: <UpdatePassword />
          },
          {
            path: "notifications",
            element: <Notifications />
          },
          {
            path: "preferences",
            element: <Preferences />
          },
          {
            path: "api-key",
            element: <ApiKey />
          },
          {
            path: "billing",
            element: <Billing />
          },
          {
            path: "text-to-audio",
            element: <TextToAudioSettings />
          },
          {
            path: "action",
            element: <Action />
          },
        ],
      },
      // {
      //   path: "insight-creation",
      //   children: [
      //     {
      //       path: "",
      //       element: <Navigate replace={true} to="insight-generator" />,
      //     },
      //     {
      //       path: "insight-generator",
      //       element: <InsightGenerator />,
      //     },
      //     // {
      //     //   path: "my-metrics",
      //     //   element: <MyKpis />,
      //     // },
      //     {
      //       path: "created-insight",
      //       element: <CreatedInsight />,
      //     },
      //   ],
      // },
      {
        path: "content-creation",
        children: [
          {
            path: "",
            element: <Navigate replace={true} to="topic-generator" />,
          },
          {
            path: "topic-generator",
            element: <TopicGenerator />,
          },
          {
            path: "my-topics",
            element: <MyTopics />,
          },
          {
            path: "created-content",
            element: <CreatedContent />,
          },
        ],
      },
      {
        path: "video-creation",
        children: [
          {
            element: <VideoGenerator />,
            index: true,
          },
          {
            path: "video-generator",
            element: <VideoGenerator />,
          },
          {
            path: "my-videos",
            element: <MyVideos />,
          },
          {
            path: "created-videos",
            element: <CreatedVideos />,
          },
        ],
      },
    ],
  },
  {
    path: "share",
    element:  <AuthenticationGuard  component={AcceptAssistant} />,
    errorElement: <ErrorPage />,

  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const auth0Domain = import.meta.env.VITE_APP_AUTH0_DOMAIN as string;
const auth0ClientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string;
const auth0RedirectUri = import.meta.env.VITE_APP_AUTH0_REDIRECT_URI as string;
const auth0Audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE as string;

// const isBrave = (navigator.brave && (await navigator.brave.isBrave())) || false;
// const useRefreshTokens = isSafari || isFirefox || isBrave ? true : false;
const useRefreshTokens = isSafari || isFirefox ? true : false;

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          // redirect_uri: auth0RedirectUri,
          redirect_uri: window.location.origin,
          audience: auth0Audience
        }}
        useRefreshTokens={useRefreshTokens}
        cacheLocation={useRefreshTokens ? "localstorage" : "memory"}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ChakraProvider theme={theme}>
             {/* <AnnouncementBar />  */}
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </DndProvider>
  </React.StrictMode>
);
