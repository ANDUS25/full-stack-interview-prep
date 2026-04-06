import questionModel from "../models/question.model.js";

const deleteQuestion = async (req, res) => {
  try {
    console.log("req.params", req.params);

    const { subject, id } = req.params;

    if (!subject || !id) {
      return res.status(400).json({
        status: "error",
        message: "Subject and ID are required",
        responseCode: 400,
      });
    }

    const newQuestion = new questionModel({
      subject: subject.toLowerCase(),
      _id: id,
    });

    await newQuestion.deleteOne();

    return res.status(201).json({
      status: "success",
      message: "Question deleted successfully",
      data: newQuestion,
      responseCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteQuestion;
