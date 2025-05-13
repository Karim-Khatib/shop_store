import express from "express";
import morgan from "morgan";
import UserModel from "./model/user";
import { connectToMongo } from "./provider/mongo";
import { authRouter } from "./routes/authRout";
import fileRouter from "./routes/fileRouter";
const app = express();
morgan.token("body", (req): string | undefined => {
  return (req as any).body && Object.keys((req as any).body).length
    ? JSON.stringify((req as any).body)
    : undefined;
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res) ? `Body: ${tokens.body(req, res)}` : "",
    ].join(" ");
  })
);
const port = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", async (req, res) => {
  const data = await UserModel.find();
  res.json({
    UserModel: UserModel.modelName,
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
