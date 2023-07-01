const mongoose = require("mongoose");
// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

// Create the user model
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
