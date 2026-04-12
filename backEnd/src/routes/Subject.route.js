import express from "express";
import subjectController from "../controller/subject.controller.js";
import createQuestion from "../controller/question.controller.js";
import deleteQuestion from "../controller/delete.question.controller.js";
import updateQuestion from "../controller/update.question.controller.js";
import getAllSubjects from "../controller/allSubject.controller.js";

const router = express.Router();

// This route is to get subject specific data
router.get("/", getAllSubjects);
router.get("/:subject", subjectController);
router.post("/new-question", createQuestion);
router.delete("/:subject/:id", deleteQuestion);
router.patch("/:subject/:id", updateQuestion);

export default router;
