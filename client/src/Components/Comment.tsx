import React from 'react'

export const Comment = ({ showComment, onShowComment }: any) => {
  return (
    <div className="my-8">
      {
        [1,2,3].map((item, i) => (
          <div className="mb-8" key={i}>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl mr-4">Test</h1>
              <p>Date here</p>
            </div>  
            <p className="text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis cum, expedita similique nobis quibusdam facilis itaque maiores sed, quas unde ullam animi sit quae odio, voluptatum nesciunt! Dolore cum odio sit voluptatem dignissimos sunt, adipisci dolores neque deserunt quia aliquam necessitatibus enim. Molestiae asperiores nemo numquam quae ea. Perspiciatis, possimus!</p>
            <div className="flex my-4">
              <button className="mr-4">Like</button>
              <button onClick={() => onShowComment(i)}>Comment</button>
            </div>
            {
              showComment[i]?.isDisplayed &&
              <div className="p-4 bg-white/10 rounded-md">
                {
                  [1,2,3].map((item, i) => (
                    <div className="my-2 bg-white/20 p-2 rounded-md" key={i}>
                      <div className="flex items-center">
                        <h1 className="mr-2">User</h1>
                        <p>Date</p>
                      </div>
                      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, enim!</p>
                    </div>
                  ))
                }
                <input type="text" className="w-full rounded-md p-2 bg-white/20 focus:outline-none" placeholder="Write a comment..." />
              </div>
            }
          </div>
        ))
      }
    </div>
  )
}
