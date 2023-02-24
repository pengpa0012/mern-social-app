import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onShowComment } from '../utilities'
import * as dayjs from 'dayjs'
import axios from 'axios'
import Notiflix from 'notiflix'

export const Post = ({posts, allPost, setAllPosts, showComment, setShowComment}: any) => {
  const navigate = useNavigate()
  const {id} = useParams()
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")
  const username = localStorage.getItem("username")
  const [comment, setComment] = useState("")

  const onLikePost = (item: any) => {
    axios.post(`${import.meta.env.VITE_ENDPOINT}post/likePost`, {
        _id: item._id,
        userId
      }, 
      {
      headers: {
        "x-access-token": token
      }
    })
    .then((response: any) => {
      const newPosts = [...allPost]
      const index = newPosts.findIndex(post => post._id == item._id)
      const alreadyLiked = newPosts[index].like.find((e: any) => e.user == userId)
      if(alreadyLiked) {
        newPosts[index].like.splice(newPosts[index].like.findIndex((e: any) => e.user == userId), 1)
        Notiflix.Notify.success("Unliked Post")
      } else {
        newPosts[index].like.push({user: userId, _id: item._id})
        Notiflix.Notify.success("Liked Post")
      }
      setAllPosts(newPosts)
    })
    .catch(err => Notiflix.Notify.failure(err.response.data.message))
  }
  
  const onComment = (item: any) => {
    axios.post(`${import.meta.env.VITE_ENDPOINT}post/commentPost`, {
      _id: item._id,
      comments: {
        user: userId,
        name: username,
        text: comment
      }
      }, 
      {
      headers: {
        "x-access-token": token
      }
    })
    .then(res => {
      const newPosts = [...allPost]
      const index = newPosts.findIndex(post => post._id == item._id)
      newPosts[index].comments.push(res.data.message)
      setAllPosts(newPosts)
    })
    .catch(err => Notiflix.Notify.failure(err.response.data.message))
    setComment("")
  }

  const onDeletePost = (item: any) => {
    Notiflix.Confirm.show(
      'Delete Post',
      'Are you sure?',
      'Delete',
      'Cancel',
      function okCb() {
        axios.post(`${import.meta.env.VITE_ENDPOINT}post/deletePost`, {
          _id: item._id
          }, 
          {
          headers: {
            "x-access-token": token
          }
        })
        .then(res => {
          const newPosts = [...allPost]
          const index = newPosts.findIndex(post => post._id == item._id)
          newPosts.splice(index, 1)
          console.log(newPosts)
          setAllPosts(newPosts)
          Notiflix.Notify.success("Post deleted")
        })
        .catch(err => Notiflix.Notify.failure(err.response.data.message))
      },
      function cancelCb() {
      },
      {
        titleColor: '#fff',
        backgroundColor: "#242424",
        messageFontSize: '18px',
        messageColor: "#fff",
        okButtonBackground: '#ef4444'
      },
    );
    
  }

  return (
    <div className="my-2">
      {
        posts.sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).map((item: any, i: number) => (
          <div className="mb-4 bg-white/10 p-4 rounded-md relative" key={i}>
            {username == id && <button className="absolute -top-[5px] -right-[5px] w-8 h-8 bg-red-500 hover:bg-red-600 grid place-items-center rounded-full cursor-pointer" onClick={() => onDeletePost(item)}>&#x2715;</button>}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl" onClick={() => navigate(`/profile/${item.username}`)}>{item.username}</h2>
              <p className="text-sm text-white/50">{dayjs(item.date).format("MMM DD, YYYY h:mm a")}</p>
            </div>  
            <p className="text-md text-white/70 break-words">{item.description}</p>
            <div className={`flex mt-4`}>
              <button className="mr-4 text-white/50 relative" onClick={() => onLikePost(item)}>
               <span className={item.like.find((user: any) => user.user == userId) ? "text-blue-400 font-bold" : ""}>Like</span>
               {item.like.length > 0 ? <span className="absolute -top-[3px] -right-[12px] -z-10 bg-white w-4 h-4 rounded-full text-xs grid place-items-center text-blue-500 font-bold">{item.like.length}</span>
               : undefined}
              </button>
              <button className="text-white/50 relative" onClick={() => setShowComment({show: true, index: i})}>
                Comment
                {item.comments.length > 0 ? <span className="absolute -top-[3px] -right-[12px] -z-10 bg-red-500 w-4 h-4 rounded-full text-xs grid place-items-center text-white font-bold">{item.comments.length}</span>
                : undefined}
                </button>
            </div>
            {
              (showComment?.show && showComment?.index == i) &&
              <div className="p-4 bg-black/20 rounded-md mt-4">
                <div className="max-h-[500px] overflow-auto mb-2">
                  {
                    item.comments.map((item: any, i: number) => (
                      <div className="my-2 bg-black/10 p-3 rounded-md" key={i}>
                        <div className="flex items-center justify-between">
                          <h1 className="mr-2">{item.name}</h1>
                          <p className="text-xs text-white/50">{dayjs(item.date).format("MMM DD, YYYY h:mm a")}</p>
                        </div>
                        <p>{item.text}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="flex">
                  <input type="text" className="w-full rounded-md p-2 bg-black/20 focus:outline-none" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} value={comment}/>
                  <button className="bg-green-500 hover:bg-green-600 px-2 rounded-md ml-2" onClick={() => onComment(item)}>Comment</button>
                </div>
              </div>
            }
          </div>
        ))
      }
    </div>
  )
}
