import questionModel from "../models/question.model.js";

const updateQuestion = async (req, res) => {
  try {
    console.log("req.params", req.params);
    console.log("req.body", req.body);

    const { subject, id } = req.params;
    const { question, answer, note } = req.body; // Fields to update

    if (!subject || !id) {
      return res.status(400).json({
        status: "error",
        message: "Subject and ID are required",
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
        status: "error",
        message: "Question not found",
        responseCode: 404,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Question updated successfully",
      data: updatedQuestion,
      responseCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateQuestion;
