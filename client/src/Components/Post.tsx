import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onShowComment } from '../utilities'
import * as dayjs from 'dayjs'
import axios from 'axios'
import Notiflix from 'notiflix'

export const Post = ({posts, setAllPosts}: any) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")
  const username = localStorage.getItem("username")

  const onLikePost = (item: any) => {
    
    axios.post(`http://localhost:3000/post/likePost`, {
        _id: item._id,
        userId
      }, 
      {
      headers: {
        "x-access-token": token
      }
    })
    .then((response: any) => {
      const newPosts = [...posts]
      const index = newPosts.findIndex(post => post._id == item._id)
      const alreadyLiked = newPosts[index].like.find((e: any) => e.user == userId)
      if(alreadyLiked) {
        newPosts[index].like.splice(newPosts[index].like.findIndex((e: any) => e.user == userId), 1)
       console.log(newPosts)
        Notiflix.Notify.success("Unlike Post Successfully")
      } else {
        Notiflix.Notify.success("Like Post Successfully")
        newPosts[index].like.push({user: userId, _id: item._id})
      }
      setAllPosts(newPosts)
    })
    .catch(err => Notiflix.Notify.failure(err.response.data.message))
  }

  return (
    <div className="my-2">
      {
        posts.sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).map((item: any, i: number) => (
          <div className="mb-4 bg-white/10 p-4 rounded-md" key={i}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl" onClick={() => navigate(`/profile/${item.username}`)}>{item.username}</h2>
              <p className="text-sm text-white/50">{dayjs(item.date).format("MMM DD, YYYY h:mm a")}</p>
            </div>  
            <p className="text-md text-white/70">{item.description}</p>
            <div className={`flex mt-4`}>
              <button className={`mr-4 text-white/50 relative ${item.like.find((user: any) => user.user == userId) ? "text-blue-400 font-bold" : ""}`} onClick={() => onLikePost(item)}>
               <span>Like</span>
               {item.like.length > 0 ? <span className="absolute -top-[3px] -right-[12px] -z-10 bg-white w-4 h-4 rounded-full text-xs grid place-items-center text-blue-500 font-bold">{item.like.length}</span>
               : undefined}
              </button>
              <button className="text-white/50">Comment</button>
            </div>
            {/* {
              showComment[i]?.isDisplayed &&
              <div className="p-4 bg-black/20 rounded-md">
                {
                  [1,2,3].map((item, i) => (
                    <div className="my-2 bg-black/10 p-2 rounded-md" key={i}>
                      <div className="flex items-center">
                        <h1 className="mr-2">User</h1>
                        <p>Date</p>
                      </div>
                      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, enim!</p>
                    </div>
                  ))
                }
                <input type="text" className="w-full rounded-md p-2 bg-black/20 focus:outline-none" placeholder="Write a comment..." />
              </div>
            } */}
          </div>
        ))
      }
    </div>
  )
}
