const express = require("express");
const User = require("../Models/User"); // Assuming you have a separate User model file
const { generateToken } = require("../helpers/token");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, gender } = req.body;
    const userData = {
      firstname,
      lastname,
      username,
      email,
      password,
      gender,
    };

    const newUser = await User.create(userData);
    const registerationToken = generateToken(
      { id: newUser._id.toString() },
      "30m"
    );

    res.json({
      firstname: newUser.firstname,
      email: newUser.email,
      token: registerationToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activateUser = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(user);
  try {
    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    foundUser.verified = true;
    await foundUser.save();
    const { firstName, lastName, email } = foundUser;
    return res.json({
      message: "User activated successfully",
      firstName,
      lastName,
      email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUser, registerUser, activateUser };
