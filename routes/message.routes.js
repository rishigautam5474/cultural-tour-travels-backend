import express from "express";
import { accessAllMessage, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/", accessAllMessage);
router.post("/send-message", sendMessage);

export default router;
