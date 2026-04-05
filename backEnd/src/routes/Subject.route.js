import express from "express";
import subjectController from "../controller/subject.controller.js";
import subjectInfoController from "../controller/subject.info.controller.js";

const router = express.Router();

// This route is to get subject specific data
router.get("/:subject", subjectController);
router.post("/new-question", subjectInfoController);

export default router;
