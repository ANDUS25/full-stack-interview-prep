import questionModel from "../models/question.model.js";

const addNewSubject = async (req, res) => {
  try {
    const { subject, question, answer, note } = req.body;

    console.log("req.body", req.body);

    if (!subject || !question || !answer) {
      return res.status(400).json({
        status: "error",
        message: "Subject, question, answer, and note are required",
        responseCode: 400,
      });
    }
    console.log("here");

    const newQuestion = new questionModel({
      subject: subject.toLowerCase(),
      question,
      answer,
      note,
    });

    await newQuestion.save();

    return res.status(201).json({
      status: "success",
      message: "Question created successfully",
      responseCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default addNewSubject;
