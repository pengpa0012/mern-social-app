import React from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../Components/Post'

export const Profile = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div className="p-4">
      <div className="flex py-24">
        <h1 className="mr-28">User IMG</h1>
        <ul className='grid grid-cols-2 gap-12'>
          <li>List</li>
          <li>List</li>
          <li>List</li>
          <li>List</li>
        </ul>
      </div>
      <h2>Your posts</h2>
      <Post />
    </div>
  )
}
