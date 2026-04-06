import express from "express";
import subjectController from "../controller/subject.controller.js";
import createQuestion from "../controller/question.controller.js";
import deleteQuestion from "../controller/delete.question.model.js";

const router = express.Router();

// This route is to get subject specific data
router.get("/:subject", subjectController);
router.post("/new-question", createQuestion);
router.delete("/:subject/:id", deleteQuestion);

export default router;
