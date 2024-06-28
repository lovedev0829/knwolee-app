import { PdfUploadFormData } from "../types/upload.interface";

export const createPdfUploadFormData = (data: PdfUploadFormData): FormData => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("userId", data.userId);
  return formData;
};

export function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      if(!e.target) {
        return resolve(null)
      }
      const base64String = e.target.result;
      resolve(base64String);
    };

    reader.onerror = function (error: ProgressEvent<FileReader>) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
