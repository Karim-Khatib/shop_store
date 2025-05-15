import { Router } from "express";
import { upload } from "../config/multer.config";
import { ResponseType } from "../types/types";

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
    res.json(payload);
    return;
  }
  const fileUrl = `http://${req.hostname}:3000/uploads/${req.file.filename}`;

  const payload: ResponseType = {
    success: true,
    result: fileUrl,
  };
  res.json(payload);
});
export default fileRouter;
