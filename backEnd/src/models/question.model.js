import mongoose from "mongoose";

const subjectInfoSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      trim: true,
      lowercase: true,
    },
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
      lowercase: true,
    },
    note: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const subjectInfoModel = mongoose.model("subject", subjectInfoSchema);

export default subjectInfoModel;
