import mongoose from "mongoose";

const deleteQuestionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      lowercase: true,
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const deleteQuestionModel = mongoose.model("subject", deleteQuestionSchema);

export default deleteQuestionModel;
