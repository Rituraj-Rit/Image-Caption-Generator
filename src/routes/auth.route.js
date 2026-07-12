// Routes kon kon se hai 

let express = require("express");
let usermodel = require("../models/User.model");
let jwt = require('jsonwebtoken')
let router = express.Router();
let {registerController, loginController} = require("../controllers/auth.controller")

router.post("/register",registerController)
router.post("/login",loginController)

module.exports = router;
