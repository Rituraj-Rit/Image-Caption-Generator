// api ke ander kya hoga aur kese hoga uske kaam mein ayengi
const userModel = require("../models/User.model");
let jwt = require("jsonwebtoken");
// npm i bcryptjs
let bcrypt = require('bcryptjs')
async function registerController(req, res) {
  const { username, password } = req.body;

  let userExists = await userModel.findOne({ username });
  if (userExists) {
    return res.status(401).json({
      message: "User already exists",
    });
  }
  let user = await userModel.create({
    username,
    password: await bcrypt.hash(password,10),
  });

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

async function loginController(req, res) {
  let { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
