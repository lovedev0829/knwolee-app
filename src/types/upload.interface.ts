import { UPLOAD_STATUS } from "../utils/constants"

export interface PdfUploadFormData {
  file: File
  userId: string
}

export type FileUploadStatus = typeof UPLOAD_STATUS[keyof typeof UPLOAD_STATUS]
