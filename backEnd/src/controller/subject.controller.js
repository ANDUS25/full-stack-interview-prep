import questionModel from "../models/question.model.js";
import { Title } from "../utils/String.js";

const subjectController = async (req, res) => {
  const data = req?.params?.subject;
  // console.log("data", data);

  const getSUbjectData = await questionModel.find({
    subject: data.toLowerCase(),
  });

  try {
    if (!getSUbjectData || getSUbjectData.length === 0) {
      return res.status(404).json({
        status: Title.ERROR,
        message: Title.NO_DATA_FOUND_OF_THIS_SUBJECT,
        responseCode: 404,
      });
    }

    console.log("getSUbjectData", getSUbjectData);
    return res
      .status(200)
      .json({ status: Title.success, data: getSUbjectData, responseCode: 200 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default subjectController;
