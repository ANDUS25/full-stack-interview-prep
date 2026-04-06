import questionModel from "../models/question.model.js";

const createQuestion = async (req, res) => {
  try {
    const { subject, question, answer } = req.body;
    console.log("req.body", req.body);

    if (!subject || !question || !answer) {
      return res.status(400).json({
        status: "error",
        message: "Subject, question, and answer are required",
        responseCode: 400,
      });
    }

    const newQuestion = new questionModel({
      subject: subject.toLowerCase(),
      question,
      answer,
    });

    await newQuestion.save();

    return res.status(201).json({
      status: "success",
      message: "Question created successfully",
      data: newQuestion,
      responseCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createQuestion;
