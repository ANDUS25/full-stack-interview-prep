import questionModel from "../models/question.model.js";
import { Title } from "../utils/String.js";

const deleteQuestion = async (req, res) => {
  try {
    // console.log("req.params", req.params);

    const { subject, id } = req.params;

    if (!subject || !id) {
      return res.status(400).json({
        status: Title.ERROR,
        message: Title.SUBJECT_AND_ID_ARE_REQUIRED,
        responseCode: 400,
      });
    }

    const newQuestion = new questionModel({
      subject: subject.toLowerCase(),
      _id: id,
    });

    await newQuestion.deleteOne();

    return res.status(201).json({
      status: Title.success,
      message: Title.QUESTION_DELETED_SUCCESSFULLY,
      data: newQuestion,
      responseCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteQuestion;
