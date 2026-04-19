import questionModel from "../models/question.model.js";
import { Title } from "../utils/String.js";

const updateQuestion = async (req, res) => {
  try {
    console.log("req.params", req.params);
    console.log("req.body", req.body);

    const { subject, id } = req.params;
    const { question, answer, note } = req.body; // Fields to update

    if (!subject || !id) {
      return res.status(400).json({
        status: Title.ERROR,
        message: Title.SUBJECT_AND_ID_ARE_REQUIRED,
        responseCode: 400,
      });
    }

    // Find and update the question
    const updatedQuestion = await questionModel.findOneAndUpdate(
      { subject: subject.toLowerCase(), _id: id }, // Filter by subject and ID
      { question, answer, note }, // Update fields
      { new: true, runValidators: true }, // Return updated doc, run validations
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        status: Title.ERROR,
        message: Title.QUESTION_NOT_FOUND,
        responseCode: 404,
      });
    }

    return res.status(200).json({
      status: Title.success,
      message: Title.QUESTION_UPDATED_SUCCESSFULLY,
      data: updatedQuestion,
      responseCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateQuestion;
