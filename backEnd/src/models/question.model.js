import mongoose from "mongoose";

const subjectInfoSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      // required: [true, "Subject is required"],
      trim: true,
      lowercase: true,
    },
    question: {
      type: String,
      // required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      // required: [true, "Answer is required"],
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const subjectInfoModel = mongoose.model("subject", subjectInfoSchema);

export default subjectInfoModel;
