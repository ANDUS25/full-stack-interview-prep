import express from "express";
import subjectRouter from "./routes/Subject.route.js";

const app = express();

// custom route used a middleware
app.use("/", subjectRouter);

// app.get("/:subject", (req, res) => {
//   res.json({
//     subject: req.params.subject,
//     data: [
//       {
//         question: "What is react?",
//         answer:
//           "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. React uses a virtual DOM to optimize rendering and provides a declarative syntax for defining UI components.",
//       },
//     ],
//   });
// });

export default app;
