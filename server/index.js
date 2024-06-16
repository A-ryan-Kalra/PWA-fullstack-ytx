import express from "express";
import cors from "cors";
import webPush from "web-push";
import path from "path";
const dirname = path.resolve();

const port = 5000;
const app = express();
const apiKeys = {
  publicKey:
    "BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo",
  privateKey: "jHV8REsJiTn2_CJWHyOeUmaBuAqZycpaMtoGhfZyMy4",
};

app.use(express.static(path.join(dirname, "../", "/client/build")));
console.log(
  path.join(dirname, "../", "client", "build", "index.html"),
  " pathwow"
);
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "../", "client", "build", "index.html"));
});
webPush.setVapidDetails(
  "mailto:aryan.smart832@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
  subDatabase.push(req.body);
  res.json({ status: "Success", message: "Subscription saved!", subDatabase });
});

const details = [];
app.post("/save-details", (req, res) => {
  details.push(req.body);
  //   console.log("req.body= ", req.body);
  //   console.log("req.body= ", details[details.length - 1]);
  //   console.log("details= ", details);

  webPush.sendNotification(
    subDatabase[subDatabase.length - 1],
    JSON.stringify(details[details.length - 1])
  );

  res.send({ status: "Success", details });
});

// app.get("/send-notification", (req, res) => {
//   webPush.sendNotification(
//     subDatabase[subDatabase.length - 1],
//     JSON.stringify({ data: "Hello New World!", data2: "Hello old world!" })
//   );
//   res.json({ status: "Success", message: "Message sent to push service" });
// });

app.listen(port, () => {
  console.log("Server running on port 5000");
});

export default app;
