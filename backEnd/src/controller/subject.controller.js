import subjectModel from "../models/subject.model.js";

const subjectController = async (req, res) => {
  const data = req?.params?.subject;
  console.log("data", data);

  const getSUbjectData = await subjectModel.find({
    subject: data.toLowerCase(),
  });
  console.log("getSUbjectData", getSUbjectData);

  try {
    res
      .status(200)
      .json({ status: "success", data: getSUbjectData, responseCode: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default subjectController;
