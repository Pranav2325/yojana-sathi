import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["student", "farmer", "women", "scst", "buisness", "general"],
      required: true,
    },
    benefits: {
      type: String,
    },
    eligibility: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      gender: {
        type: String,
        enum: ["male", "female", "any"],
        default: "any",
      },
      maxAnnualIncome: { type: Numbder, default: 1000000 },
      casteRequired: [{ type: String }],
      states: [
        {
          type: String,
        },
      ],
      isStudentRequired: { type: Boolean, default: false },
      isFarmerRequired: { type: Boolean, default: false },
      isWomenRequired: { type: Boolean, default: false },
    },
    documentsRequired: [{ type: String }],
    applicationLink: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Scheme = mongoose.model("Scheme", schemeSchema);
export default Scheme;
