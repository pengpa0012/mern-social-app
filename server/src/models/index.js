const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [{type: String}],
  following: [{type: String}],
  bio: {
    interests: [{type: String}],
    birthday: {
      type: Date
    }, 
    age: {
      type: Number
    },
    gender: {
      type: String
    }
  }
})

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    name: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  like: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  date: Date
})

module.exports = {
  Users: mongoose.model('user', userSchema),
  Post: mongoose.model('post', postSchema),
}