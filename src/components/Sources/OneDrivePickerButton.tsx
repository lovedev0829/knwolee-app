import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PlusIcon from "src/Icons/PlusIcon";
import { useHandleOneDriveFilePickMutation } from "src/api/mutations/entityIndex";
import { useMicrosoftLoginMutation } from "src/api/mutations/thirdPartyIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import { v4 as uuidv4 } from "uuid";

export type MessageEventType = {
  data: {
    command: string;
    items: [
      {
        id: string;
      }
    ];
  };
  type: string;
  channelId: string;
  id: string;
};

let win: Window | null = null;
let port: MessagePort | null = null;

// Unique channel ID for communication
const channelId = uuidv4();

// Options for the OneDrive picker
const options = {
  sdk: "8.0",
  messaging: {
    // Specify the origin of your application
    origin: window.location.origin,
    channelId: channelId,
  },
  multiSelect: true,
};

const baseUrl = "https://onedrive.live.com/picker/";

interface Props extends ButtonProps {
  action: string;
  disabled?: boolean;
}

function OneDrivePickerButton({
  action,
  disabled = false,
  ...buttonProps
}: Props) {
  const borderColor = useColorModeValue("neutral.30", "#343839");
  const color = useColorModeValue("neutral.90", "neutral.10");
  const bg = useColorModeValue("white", "#232627");

  const { data: thirdPartyConfig, isLoading: isLoadingThirdPartyConfig } =
    useThirdPartyConfig();
  const { mutateAsync: authorizeMicrosoft, isLoading: microsoftAuthLoading } =
    useMicrosoftLoginMutation();
  const {
    mutateAsync: handleOneDriveFilePick,
    isLoading: processingOneDriveFile,
    error: oneDriveFilePickError,
  } = useHandleOneDriveFilePickMutation();

  async function handleAuthorizeMicrosoft() {
    const data = await authorizeMicrosoft();
    if (data.authURL) {
      // window.open(data.authURL);
      window.location.href = data.authURL;
    }
  }

  // Event listener to handle commands from the picker
  async function channelMessageListener(
    message: MessageEvent<MessageEventType>
  ) {
    const payload = message.data;

    switch (payload.type) {
      // Handle other message types...
      case "command": {
        port && port.postMessage({ type: "acknowledge", id: payload.id }); // Use logical AND instead of optional chaining
        const command = payload.data;
        switch (command.command) {
          case "close":
            // Handle close command (e.g., close picker window)
            win && win.close();
            break;
          case "pick": {
            const itemId = command.items?.[0]?.id;
            await handleOneDriveFilePick({ itemId: itemId });
            win && win.close();
            break;
          }
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }

  // Event listener to handle incoming messages from the picker
  function initializeMessageListener(event: MessageEvent<MessageEventType>) {
    if (event.source && event.source === win) {
      const message = event.data;
      if (
        message.type === "initialize" &&
        message.channelId === options.messaging.channelId
      ) {
        port = event.ports && event.ports[0]; // Use logical AND instead of optional chaining
        if (port) {
          port.addEventListener("message", channelMessageListener);
          port.start();
          port.postMessage({ type: "activate" });
        }
      }
    }
  }

  function handleOneDriveAddClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    thirdPartyConfig?.microsoft?.token?.access_token
      ? launchPicker()
      : handleAuthorizeMicrosoft();
  }

  function launchPicker() {
    win = window.open("", "Picker", "width=1080,height=680");

    const authToken = thirdPartyConfig?.microsoft?.token?.access_token;

    // if (!authToken) {
    //   handleAuthorizeMicrosoft();
    //   return;
    // }

    const queryString = new URLSearchParams({
      filePicker: JSON.stringify(options),
    }).toString(); // Convert URLSearchParams to string

    const url = `${baseUrl}?${queryString}`;
    const form = win && win.document.createElement("form");

    if (form) {
      form.setAttribute("action", url);
      form.setAttribute("method", "POST");
      if (win != null) {
        win.document.body.append(form);
        const input = win.document.createElement("input"); // Remove optional chaining

        if (input) {
          input.setAttribute("type", "hidden");
          input.setAttribute("name", "token");
          input.setAttribute("value", authToken!);
          form.appendChild(input);
          form.submit();
        }
      }
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://alcdn.msauth.net/browser/2.19.0/js/msal-browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Register message listener when component mounts
  useEffect(() => {
    window.addEventListener("message", initializeMessageListener);
    return () => {
      window.removeEventListener("message", initializeMessageListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (oneDriveFilePickError) {
      win && win.close();
    }
  }, [oneDriveFilePickError]);

  return (
    <Button
      display="flex"
      padding="12px 24px"
      justifyContent="center"
      alignItems="center"
      alignSelf="stretch"
      borderRadius="10px"
      border="2px solid"
      borderColor={borderColor}
      color={color}
      bg={bg}
      leftIcon={<PlusIcon />}
      fontSize="16px"
      fontWeight="500"
      onClick={handleOneDriveAddClick}
      isDisabled={disabled}
      isLoading={
        microsoftAuthLoading ||
        isLoadingThirdPartyConfig ||
        processingOneDriveFile
      }
      {...buttonProps}
    >
      {action}
    </Button>
  );
}

export default OneDrivePickerButton;
