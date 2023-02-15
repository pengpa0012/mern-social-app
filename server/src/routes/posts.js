const express = require("express")
require("dotenv").config()
const router = express.Router()
const {Post} = require("../models")
const { verifyJWT } = require("../utils")


router.post("/createPost", verifyJWT, async (req, res) => {
  const { username, title, description } = req.body
  
  const newPost = new Post({
    username,
    title,
    description
  })

  const result = await newPost.save()

  if(result) {
    res.status(200).send({ message: result })
  } else {
    res.status(200).send({ message: "Error Create Post" })
  }

})

router.post("/deletePost", verifyJWT, async (req, res) => {
    const { _id } = req.body
    
    const result = await Post.deleteOne({_id})

    if(result) {
      res.status(200).send({ message: result })
    } else {
      res.status(200).send({ message: "Error Delete Post" })
    }
})

router.post("/editPost", verifyJWT, (req, res) => {
  
})

router.post("/commentPost", verifyJWT, (req, res) => {
  
})

router.post("/likePost", verifyJWT, (req, res) => {
  
})

router.get("/getAllPosts", verifyJWT, async (req, res) => {
  const result = await Post.find({})

  if(result) {
    res.status(200).send({ Posts: result })
  } else {
    res.status(200).send({ message: "Error Getting Users" })
  }
})




module.exports = router