import express from "express";
import subjectController from "../controller/subject.controller.js";

const router = express.Router();

// This route is to get subject specific data
router.get("/:subject", subjectController);

export default router;
