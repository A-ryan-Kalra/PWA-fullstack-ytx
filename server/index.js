import express from "express";
import cors from "cors";
import webPush from "web-push";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./src/config/dbConfig.js";
import router from "./src/routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const dirname = path.resolve();
connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", router);

app.use(express.static(path.join(dirname, "/client/build")));
console.log(path.join(dirname, "client", "build", "index.html"), " pathwow");
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

export default app;
