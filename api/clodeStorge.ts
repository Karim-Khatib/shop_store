import { showLoading, showSuccess } from "@/component/core/toast";
import api from "./client";
import { ResponseType } from "./responseType";

export const uploadFile = async (file: {
  uri: string;
  type?: string;
  fileName?: string;
}): Promise<ResponseType> => {
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri,
    name: file.fileName || "upload.jpg",
    type: file.type || "image/jpeg",
  } as any); // React Native FormData type workaround

  try {
    showLoading();

    const response = await api.post<
      ResponseType,
      { data?: ResponseType },
      FormData
    >("/uploadedFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) {
      throw new Error("Upload failed");
    }
    // console.log("✅ Upload success:", response.data);
    showSuccess("✅ Upload success:");
    return response.data;
  } catch (error) {
    // console.error("❌ Upload error:", error);
    // console.log(error);
    showSuccess("❌ Upload error:");

    const internalError: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "Upload failed",
      },
    };
    return internalError;
  }
};
