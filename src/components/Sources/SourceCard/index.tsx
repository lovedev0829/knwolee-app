import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonProps,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import PlusIcon from "../../../Icons/PlusIcon";
import LockIcon from "../../../Icons/LockIcon";
import SourceModal from "../Modals";
import { SOURCE_TYPE, SourceType } from "../SourcesList";
import CarbonConnectModal from "src/components/CarbonConnectModal/CarbonConnectModal";
import { ENABLED_INTEGRATIONS } from "src/constants/carbonAI";
import { Integration, IntegrationName } from "carbon-connect";
import { useHandleGoogleDriveTextMutation } from "src/api/mutations/entityIndex";
import { useThirdPartyConfig } from "src/api/queries/thirdPartyQuery";
import { useGoogleExportUrlContentMutation, useGoogleLoginMutation } from "src/api/mutations/thirdPartyIndex";
import OneDrivePickerButton from "../OneDrivePickerButton";


export interface SourceCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  action: string;
  sourceType: SourceType;
  isLocked?: boolean;
  isRequestCard?: boolean;
  isComingSoonCard?: boolean;
  isCarbon?: boolean;
}
interface ActionButtonProps extends ButtonProps{
  action: string;
  onClickAction?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  onClickAction,
  disabled,
  ...buttonProps
}) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      display="flex"
      padding="12px 24px"
      justifyContent="center"
      alignItems="center"
      alignSelf="stretch"
      borderRadius="10px"
      border="2px solid"
      borderColor={colorMode === "dark" ? "#343839" : "neutral.30"}
      color={colorMode === "dark" ? "neutral.10" : "neutral.90"}
      bg={colorMode === "dark" ? "#232627" : "white"}
      leftIcon={action === 'Coming Soon'
        ? <LockIcon fill={colorMode === "dark" ? "#FEFEFE" : undefined} />
        : <PlusIcon />
              }
      fontSize="16px"
      fontWeight="500"
      onClick={onClickAction}
      isDisabled={disabled}
      {...buttonProps}
    >
      {action}
    </Button>
  )
}

const SourceCard: React.FC<SourceCardProps> = ({
  title,
  icon,
  iconColor,
  action,
  sourceType,
  isLocked,
  isCarbon = false,
}) => {
  const [openCarbonModal, setOpenCarbonModal] = useState(false);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPickerApiLoaded, setIsPickerApiLoaded] = useState(false);

  const { mutateAsync: handleGoogleDriveText } =
    useHandleGoogleDriveTextMutation();

  const { data: thirdPartyConfig } = useThirdPartyConfig();

  const { mutateAsync: authorizeGoogle, isLoading: googleAuthLoading } =
    useGoogleLoginMutation();

  const { mutateAsync: googleExportUrlContent } = useGoogleExportUrlContentMutation();
 
  async function handleAuthorizeGoogle() {
    const data = await authorizeGoogle();
    if (data.authURL) {
      // window.open(data.authURL);
      window.location.href = data.authURL;
    }
  }

  useEffect(() => {
    window.gapi.load("picker", { callback: () => setIsPickerApiLoaded(true) });
  }, []);

  const showPicker = (accessToken: string) => {
    if (isPickerApiLoaded && accessToken) {
      const docsView = new google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(false);

      // This approach tries to add all desired types to one view.
      // Note: Adjust according to the actual API support and documentation.
      docsView.setMimeTypes([
        'application/vnd.google-apps.document',
        'application/vnd.google-apps.spreadsheet',
        'application/vnd.google-apps.presentation'
        ].join(','));

      const picker = new window.google.picker.PickerBuilder()
        .addView(docsView)
        .setOAuthToken(accessToken)
        // .setDeveloperKey(GoogleAPIKey)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setCallback(async (data) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const doc = data.docs[0];
            // console.log("Selected document", doc);
            // Pass the doc.mimeType to fetchDocumentContent
            const text = await fetchDocumentContent(doc.id, doc.mimeType); // Fetch and handle the document content
            
            if(!text || !text.length) {
              return;
            }
            await handleGoogleDriveText({ doc: doc, text });
          }
        })

        .build();
      picker.setVisible(true);
    }
  };

  const handleActionClick = () => {
    switch (sourceType) {
      case SOURCE_TYPE.GOOGLE_DRIVE: {
        const token = thirdPartyConfig?.google?.token?.access_token;
        if (token) {
          showPicker(token);
        }
        break;
      }

      case SOURCE_TYPE.ONEDRIVE: {
        const token = thirdPartyConfig?.microsoft?.token?.access_token;
        if (token) {
          showPicker(token);
        }
        break;
      }

      default: {
      onOpen(); // Handle other actions
    }
    }
  };

  const fetchDocumentContent = async (docId: string, docType: string) => {
      try {
      const responseText = await googleExportUrlContent({ docId, docType });
      // console.log("")
      const text = responseText?.text;
      return text;
    } catch (error) {
      console.error("Error fetching document content:", error);
      return null;
    }
  };

  return (
    <>
      <Box
        display="flex"
        width={["full", "calc(50% - 8px)", "300px", "242px"]}
        padding="20px 24px"
        flexDirection="column"
        justifyContent="center"
        alignItems="flexStart"
        gap="20px"
        borderRadius="12px"
        border="1px solid"
        borderColor={colorMode === "dark" ? "#343839" : "neutral.20"}
        backgroundColor="neutral.'01100'"
      >

        <Box
          display="flex"
          height="60px"
          alignItems="center"
          gap="16px"
          alignSelf="stretch"
          opacity={isLocked ? 0.4 : 1}
        >
          <Box
            w="60px"
            h="60px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="10px"
            bg={iconColor}
          >
            {icon}
          </Box>
          <Text
            color={colorMode === "dark" ? "neutral.10" : "neutral.90"}
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            {title}
          </Text>
        </Box>
        {isLocked ? (
          <ActionButton action="Coming Soon" />
        ) : sourceType === SOURCE_TYPE.GOOGLE_DRIVE ? (
          <ActionButton
            action={action}
            onClickAction={thirdPartyConfig?.google?.token ? handleActionClick : handleAuthorizeGoogle}
            // disabled={thirdPartyConfig?.google?.token ? false : true}
            isLoading={googleAuthLoading}
          />
        ) : sourceType === SOURCE_TYPE.ONEDRIVE ? (
          <OneDrivePickerButton action={action} />
        ) : (
          <ActionButton
            action={action}
            onClickAction={handleActionClick}
            disabled={false}
          />
        )}
      </Box>
      <SourceModal isOpen={isOpen} onClose={onClose} sourceType={sourceType} />

      {isCarbon && openCarbonModal && (
        <CarbonConnectModal
          open={openCarbonModal}
          setOpen={setOpenCarbonModal}
          enabledIntegrations={[
            ENABLED_INTEGRATIONS[sourceType as IntegrationName] as Integration,
          ]}
        />
      )}
    </>


  );
};

export default SourceCard;
