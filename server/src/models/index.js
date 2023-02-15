const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  like: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
})

module.exports = {
  Users: mongoose.model('user', userSchema),
  Post: mongoose.model('post', postSchema),
}