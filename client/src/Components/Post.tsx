import React, { useState } from 'react'
import { onShowComment } from '../utilities'

export const Post = ({posts}: any) => {
 
  return (
    <div className="my-2">
      {
        posts.map((item: any, i: number) => (
          <div className="mb-8 bg-white/10 p-4 rounded-md" key={i}>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl mr-4">Test</h1>
              <p>Date here</p>
            </div>  
            <p className="text-md">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis cum, expedita similique nobis quibusdam facilis itaque maiores sed, quas unde ullam animi sit quae odio, voluptatum nesciunt! Dolore cum odio sit voluptatem dignissimos sunt, adipisci dolores neque deserunt quia aliquam necessitatibus enim. Molestiae asperiores nemo numquam quae ea. Perspiciatis, possimus!</p>
            <div className={`flex mt-4`}>
              <button className="mr-4">Like</button>
              <button>Comment</button>
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
