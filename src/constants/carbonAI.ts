import { Integration, IntegrationName } from "carbon-connect";

export const ENABLED_INTEGRATIONS: Partial<Record<IntegrationName, Integration>> = {
  [IntegrationName.DROPBOX.toLowerCase()]: {
    id: IntegrationName.DROPBOX,
    skipEmbeddingGeneration: true,
  },
  [IntegrationName.GOOGLE_DRIVE.toLowerCase()]: {
    id: IntegrationName.GOOGLE_DRIVE,
    skipEmbeddingGeneration: true,
  },
  [IntegrationName.NOTION.toLowerCase()]: {
    id: IntegrationName.NOTION,
    skipEmbeddingGeneration: true,
  },
  [IntegrationName.ONEDRIVE.toLowerCase()]: {
    id: IntegrationName.ONEDRIVE,
    skipEmbeddingGeneration: true,
  },
  [IntegrationName.OUTLOOK.toLowerCase()]: {
    id: IntegrationName.OUTLOOK,
    skipEmbeddingGeneration: true,
  },
  [IntegrationName.SHAREPOINT.toLowerCase()]: {
    id: IntegrationName.SHAREPOINT,
    skipEmbeddingGeneration: true,
  },
};
