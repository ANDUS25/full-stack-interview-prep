import questionModel from "../models/question.model.js";
import { Title } from "../utils/String.ts";

// Specific API for to get all data and  filter for subject specific data is in subject.controller.js
const getAllSubjects = async (req, res) => {
  try {
    const getSubjectData = await questionModel.find({});
    console.log("getSubjectData", getSubjectData);

    return res.status(200).json({
      status: Title.success,
      message: Title.SUBJECTS_RETRIEVED_SUCCESSFULLY,
      data: getSubjectData,
      responseCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getAllSubjects;
