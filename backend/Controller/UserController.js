const express = require("express");
const User = require("../Models/User"); // Assuming you have a separate User model file

const getUser = (req, res) => {
  res.json({ id: 1 });
};

const createUser = async (req, res) => {
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
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, createUser };
