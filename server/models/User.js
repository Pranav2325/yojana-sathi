import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      age: { type: Number },
      gender: { type: String },
      state: { type: String },
      annualIncome: { type: Number },
      caste: { type: String },
      occupation: { type: String },
      isStudent: { type: Boolean, default: false },
      isFarmer: { type: Boolean, default: false },
      isWomen: { type: Boolean, default: false },
    },
    savedSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],
  },
  {
    timestamps: true,
  },
);
const User=mongoose.model('User',userSchema)
export default User
