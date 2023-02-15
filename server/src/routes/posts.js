const express = require("express")
require("dotenv").config()
const router = express.Router()
const {Post} = require("../models")
const { verifyJWT } = require("../utils")


router.post("/createPost", verifyJWT, (req, res) => {
  
})

router.post("/deletePost", verifyJWT, (req, res) => {
  
})

router.post("/editPost", verifyJWT, (req, res) => {
  
})



module.exports = router