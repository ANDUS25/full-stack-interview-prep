import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      lowercase: true,
    },
    questions: {
      type: String,
      trim: true,
      lowercase: true,
    },
    notes: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const subjectModel = mongoose.model("subject", subjectSchema);

export default subjectModel;
