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
export const saveEndpoint = async (req, res) => {
  const { username, endpoint } = req.body;
  try {
    console.log("username=", username);
    console.log("endpoint=", endpoint);
    const endPoint = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          endpoint,
        },
      }
    );

    console.log("newEndpoint,", endPoint);
    res.status(200).json(endPoint);
  } catch (error) {
    console.error(error);
  }
};

export const saveDetails = async (req, res) => {
  const { details, endpoint, receiver, sender } = req.body;

  try {
    console.log("THis time is different= ", req.body);

    const newDetails = new Detail({
      title: details.title,
      body: details.body,
      createdAt: details.createdAt,
      receiver,
      sender,
    });
    await newDetails.save();
    console.log("newDetails wow=", newDetails);

    webPush.sendNotification(endpoint[0], JSON.stringify(details));
    res.status(200).json(newDetails);
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (req, res) => {
  try {
    const getDetails = await Detail.find();

    res.status(200).json(getDetails);
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const form = req.body;
    const newUser = await User.create({
      username: form.username,
      password: form.password,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exit" });
    }
    res.status(200).json(user);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};
