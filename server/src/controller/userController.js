import { title } from "process";
import Detail from "../models/detail.model.js";
import User from "../models/user.model.js";

import webPush from "web-push";
const apiKeys = {
  publicKey:
    "BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo",
  privateKey: "jHV8REsJiTn2_CJWHyOeUmaBuAqZycpaMtoGhfZyMy4",
};

webPush.setVapidDetails(
  "mailto:aryan.smart832@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);
export const saveEndcpoint = async (req, res) => {
  const body = req.body;
  try {
    console.log("body= wow", body);
    const newEndpoint = new User({
      endpoint: body,
    });
    await newEndpoint.save();
    console.log("newEndpoint,", newEndpoint);
    res.status(200).json(newEndpoint);
  } catch (error) {
    console.error(error);
  }
};

export const saveDetails = async (req, res) => {
  const body = req.body;

  try {
    console.log("save Details= ", body);
    const allEndpoints = await User.find();

    console.log("arr= ", allEndpoints);
    console.log(
      "allEndpoints =",
      allEndpoints[allEndpoints.length - 1].endpoint
    );
    const data = allEndpoints[allEndpoints.length - 1].endpoint;
    console.log("Data= ", data[data.length - 1]);
    console.log("allEndpoints[0]._id,", allEndpoints[0]._id);
    const newDetails = new Detail({
      title: body.title,
      body: body.body,
      createdAt: body.createdAt,
    });
    await newDetails.save();
    console.log("newDetails wow=", newDetails);

    webPush.sendNotification(data[data.length - 1], JSON.stringify(req.body));
    res.status(200).json(newDetails);
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (req, res) => {
  try {
    const getDetails = await Detail.find();
    console.log("Details Found=", getDetails);
    res.status(200).json(getDetails);
  } catch (error) {
    console.error(error);
  }
};
