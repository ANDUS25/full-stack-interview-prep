import express from "express";
import subjectController from "../controller/subject.controller.js";

const router = express.Router();

// This route is for user registration
router.get("/:subject", subjectController);

export default router;
