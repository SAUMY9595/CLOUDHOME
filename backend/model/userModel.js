const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: ["Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: ["Password is required"],
    },
  },
  {
    timestamps: true,
  }
);



const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;