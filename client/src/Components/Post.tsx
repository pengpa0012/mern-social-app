import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onShowComment } from '../utilities'
import * as dayjs from 'dayjs'

export const Post = ({posts}: any) => {
  const navigate = useNavigate()
  return (
    <div className="my-2">
      {
        posts.sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).map((item: any, i: number) => (
          <div className="mb-4 bg-white/10 p-4 rounded-md" key={i}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl" onClick={() => navigate(`/profile/${item.username}`)}>{item.username}</h2>
              <p className="text-sm text-white/50">{dayjs(item.date).format("MMM DD, YYYY h:mm:ss a")}</p>
            </div>  
            <p className="text-md text-white/70">{item.description}</p>
            <div className={`flex mt-4`}>
              <button className="mr-4 text-white/50">Like</button>
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
