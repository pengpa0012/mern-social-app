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
    description,
    date: Date.now()
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

router.post("/editPost", verifyJWT, async (req, res) => {
  const { _id, values } = req.body

  const result = await Post.findOneAndUpdate({_id}, {...values})

  if(result) {
    res.status(200).send({ message: "Edited Successfully", result: values })
  } else {
    res.status(200).send({ message: "Error Edit Post" })
  }
})

router.post("/commentPost", verifyJWT, async (req, res) => {
  const { _id, comments } = req.body

  const post = await Post.findOne({_id})

  if(!post) {
    return res.status(500).send({ message: "Cannot find post" })
  }

  const newComment = {
    user: comments.user,
    name: comments.name,
    text: comments.text,
    date: Date.now()
  }

  post.comments.push(newComment)
  const result = await post.save()

  if(result) {
    res.status(200).send({ message: newComment })
  } else {
    res.status(200).send({ message: "Error Edit Post" })
  }
})

router.post("/likePost", verifyJWT, async (req, res) => {
  const { _id, userId } = req.body

  const post = await Post.findOne({_id})

  if(!post) {
    return res.status(500).send({ message: "Cannot find post" })
  }

  if(post.like.filter(like => like.user == userId).length != 0) {
    return res.status(500).send({ message: "Already liked the post" })
  }

  const newLike = {
    user: userId
  }

  post.like.push(newLike)
  const result = await post.save()

  if(result) {
    res.status(200).send({ message: "Post Liked" })
  } else {
    res.status(200).send({ message: "Error Edit Post" })
  }
})

router.get("/getAllPosts", verifyJWT, async (req, res) => {
  const result = await Post.find()

  if(result) {
    res.status(200).send({ Posts: result })
  } else {
    res.status(200).send({ message: "Error Getting Users" })
  }
})

router.get("/getComments", verifyJWT, async (req, res) => {
  const { _id } = req.params
  const result = await Post.find({_id})

  if(result) {
    res.status(200).send({ Comments: result.comments })
  } else {
    res.status(200).send({ message: "Error Getting Users" })
  }
})




module.exports = router