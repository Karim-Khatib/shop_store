import express from "express";
import UserModel from "./model/user";
import { connectToMongo } from "./provider/mongo";
import { authRouter } from "./routes/authRout";
import fileRouter from "./routes/fileRouter";
const app = express();
const port = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", async (req, res) => {
  const data = await UserModel.find();
  res.json({
    "UserModel": UserModel.modelName,
    "UserModel.modelName": UserModel.modelName,
    "UserModel.collection.name": UserModel.collection.name,
    "UserModel.collection.collectionName": UserModel.collection.collectionName,
    "UserModel.db.name": UserModel.db.name,
    
    data,
  });
});
app.use(fileRouter);

connectToMongo()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
