import { Router } from "express";
import { upload } from "../config/multer.config";
import { ResponseType } from "../types/responseType";

const fileRouter = Router();
fileRouter.use("/uploadedFile", upload.single("file"), (req, res) => {
  if (!req.file) {
    const payload: ResponseType = {
      success: false,
      error: {
        errorCode: 404,
        message: "No File Uploaded",
      },
    };
    res.status(404).json(payload);
    return;
  }
  const payload: ResponseType = {
    success: true,
    result: `${req.file.path}${req.file.filename}`,
  };
  res.status(200).json(payload);
});
export default fileRouter;
