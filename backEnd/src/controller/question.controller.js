import questionModel from "../models/question.model.js";
import { Title } from "../utils/String.js";

const createQuestion = async (req, res) => {
  try {
    const { subject, question, answer, note } = req.body;
    console.log("req.body", req.body);

    if (!subject || !question || !answer) {
      return res.status(400).json({
        status: Title.ERROR,
        message: Title.SUBJECT_QUESTION_ANSWER_NOTE_REQUIRED,
        responseCode: 400,
      });
    }

    const newQuestion = new questionModel({
      subject: subject.toLowerCase(),
      question,
      answer,
      note,
    });

    await newQuestion.save();

    return res.status(201).json({
      status: Title.success,
      message: Title.QUESTION_CREATED_SUCCESSFULLY,
      data: newQuestion,
      responseCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default createQuestion;
