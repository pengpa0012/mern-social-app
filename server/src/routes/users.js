const express = require("express")
require("dotenv").config()
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Users} = require("../models")
const { verifyJWT } = require("../utils")

router.post("/signup", async (req, res) => {
  const {username, email, password} = req.body
  const checkEmail = await Users.find({email})
  if(checkEmail.length > 0) {
    res.status(500).send({message: "Username already exist"})
    return
  }
  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(password, salt)

  const result = await Users.insertMany({username, email, password: hashPass})

  if(result) {
    res.status(200).send({message: "Successfully signup"})
  } else {
    res.status(500).send({message: "Error signup"})
  }
}) 

router.post("/login", async (req, res) => {
  const {email, password} = req.body
  const result = await Users.find({email})

  if(result.length > 0 && await bcrypt.compare(password, result[0].password)) {
    const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"})
    res.status(200).send({message: "Login Successfully", accessToken: token, result})
  } else {
    res.status(500).send({message: "Error login"})
  }
})

router.get("/getUsers", verifyJWT, async (req, res) => {
  const result = await Users.find()
  if(result) {
    res.status(200).send({allUsers: result})
  } else {
    res.status(500).send({message: "Error"})
  }
})

module.exports = router