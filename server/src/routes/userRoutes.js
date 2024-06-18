import express from "express";
import {
  getDetails,
  saveDetails,
  saveEndcpoint,
} from "../controller/userController.js";
const router = express.Router();

router.post("/save-subscription", saveEndcpoint);
router.post("/save-details", saveDetails);
router.get("/get-notification", getDetails);

export default router;
