import { showError, showLoading, showSuccess } from "@/component/core/toast";
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
    type: 'image/jpeg', // e.g., 'image/jpeg'
    name: 'photo.jpg', // must include an extension
  } as any); // React Native FormData type workaround

  try {

    const response = await api.post<
      ResponseType,
      { data?: ResponseType },
      FormData
    >("/uploadedFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      console.log({response})

    if (!response.data) {
      throw new Error("Upload failed");
    }
    // console.log("✅ Upload success:", response.data);
    showSuccess("✅ Upload success:");
    return response.data;
  } catch (error) {
    // console.error("❌ Upload error:", error);
    console.log({error});
    showError("❌ Upload error:");

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
