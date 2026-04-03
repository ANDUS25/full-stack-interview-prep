import subjectModel from "../models/subject.model.js";

const subjectController = async (req, res) => {
  const data = req?.params?.subject;
  console.log("data", data);

  const getSUbjectData = await subjectModel.find({
    subject: data.toLowerCase(),
  });
  console.log("getSUbjectData", getSUbjectData);

  try {
    if (!getSUbjectData || getSUbjectData.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No data Found of this subject",
        responseCode: 404,
      });
    }
    return res
      .status(200)
      .json({ status: "success", data: getSUbjectData, responseCode: 200 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default subjectController;
