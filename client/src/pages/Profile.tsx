import React from 'react'
import { useParams } from 'react-router-dom'

export const Profile = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div className="p-4">
      <div className="flex">
        <h1>User IMG</h1>
        <ul className='flex flex-1 bg-red-500'>
          <li>List</li>
          <li>List</li>
          <li>List</li>
          <li>List</li>
        </ul>
      </div>
    </div>
  )
}
