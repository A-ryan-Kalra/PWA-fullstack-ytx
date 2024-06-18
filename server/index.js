import express from "express";
import cors from "cors";
import webPush from "web-push";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./src/config/dbConfig.js";
import router from "./src/routes/userRoutes.js";
// import userRouter from "./src/routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5001;
const dirname = path.resolve();
connectDb();
const app = express();
// const apiKeys = {
//   publicKey:
//     "BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo",
//   privateKey: "jHV8REsJiTn2_CJWHyOeUmaBuAqZycpaMtoGhfZyMy4",
// };

// webPush.setVapidDetails(
//   "mailto:aryan.smart832@gmail.com",
//   apiKeys.publicKey,
//   apiKeys.privateKey
// );

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// const subDatabase = [];

app.use("/api/user", router);

// app.post("/api/save-subscription", (req, res) => {
//   subDatabase.push(req.body);
//   res.json({ status: "Success", message: "Subscription saved!", subDatabase });
// });

// const details = [];
// app.post("/api/save-details", (req, res) => {
//   details.push(req.body);
//   //   console.log("req.body= ", req.body);
//   //   console.log("req.body= ", details[details.length - 1]);
//   //   console.log("details= ", details);

//   webPush.sendNotification(
//     subDatabase[subDatabase.length - 1],
//     JSON.stringify(details[details.length - 1])
//   );

//   res.send({ status: "Success", details });
// });

// app.get("/api/get-notification", (req, res) => {
//   res.send({ status: "Success", details });
// });

app.use(express.static(path.join(dirname, "/client/build")));
console.log(path.join(dirname, "client", "build", "index.html"), " pathwow");
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

export default app;
