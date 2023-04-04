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

router.get("/getUser", verifyJWT, async (req, res) => {
  const {username} = req.query
  const result = await Users.findOne({username}, {password: 0})

  if(result) {
    res.status(200).send({user: result})
  } else {
    res.status(500).send({message: "Error"})
  }
})

router.post("/editProfile", verifyJWT, async (req, res) => {
  const { username, values } = req.body
  const result = await Users.findOneAndUpdate({username},{ bio: {...values}})

  if(result) {
    res.status(200).send({message: "Edit profile successfully", result: values})
  } else {
    res.status(500).send({message: "Error"})
  }
})

router.post("/followUser", verifyJWT, async (req, res) => {
  const { username, user_following } = req.body

  const user = await Users.findOne({username})
  const userFollowing = await Users.findOne({username: user_following})

  user.following.push(user_following)
  userFollowing.followers.push(username)

  userFollowing.save()
  const result = await user.save()

  if(result) {
    res.status(200).send({ message: "User Followed!" })
  } else {
    res.status(200).send({ message: "Error Following User" })
  }
})

router.post("/unFollowUser", verifyJWT, async (req, res) => {
  const { username, user_unfollow } = req.body

  const user = await Users.updateOne({username}, { $pull: { following: user_unfollow } })
  const userFollowing = await Users.updateOne({username: user_unfollow}, { $pull: { followers: username } })
 
  
  if(user) {
    res.status(200).send({ message: "User Followed!" })
  } else {
    res.status(200).send({ message: "Error Following User" })
  }
})


module.exports = router