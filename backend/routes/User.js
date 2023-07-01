const express = require("express");
const {
  getUser,
  registerUser,
  activateUser,
} = require("../Controller/UserController");
const router = express.Router();
router.get("/user", getUser);
router.post("/user", registerUser);
router.post("/activate", activateUser);

module.exports = router;
