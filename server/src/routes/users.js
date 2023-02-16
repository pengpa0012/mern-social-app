const express = require("express")
require("dotenv").config()
const router = express.Router()
const {Users} = require("../models")
const { verifyJWT } = require("../utils")


router.get("/getUsers", verifyJWT, async (req, res) => {
  const result = await Users.find()
  if(result) {
    res.status(200).send({allUsers: result})
  } else {
    res.status(500).send({message: "Error"})
  }
})

router.post("/editProfile", verifyJWT, async (req, res) => {
  const { _id, values } = req.body

  const result = await Users.findOneAndUpdate({_id},{ bio: {...values}})

  if(result) {
    res.status(200).send({message: "Edit profile successfully"})
  } else {
    res.status(500).send({message: "Error"})
  }
})


module.exports = router