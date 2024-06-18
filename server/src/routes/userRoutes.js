import express from "express";
import {
  createUser,
  getDetails,
  getUser,
  getUsers,
  saveDetails,
  saveEndpoint,
} from "../controller/userController.js";
const router = express.Router();

router.put("/save-subscription", saveEndpoint);
router.post("/save-details", saveDetails);
router.get("/get-notification", getDetails);
router.post("/register", createUser);
router.post("/login", getUser);
router.get("/getusers", getUsers);

export default router;
