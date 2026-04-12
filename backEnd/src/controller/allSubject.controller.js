import questionModel from "../models/question.model.js";

const getAllSubjects = async (req, res) => {
  try {
    const getSubjectData = await questionModel.find({});

    return res.status(200).json({
      status: "success",
      message: "Subjects retrieved successfully",
      data: getSubjectData,
      responseCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getAllSubjects;
