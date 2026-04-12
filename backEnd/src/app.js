import express from "express";
import subjectRouter from "./routes/Subject.route.js";

const app = express();
app.use(express.json());

// custom route used a middleware
app.use("/", subjectRouter);

export default app;
