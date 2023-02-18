import React from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <form className="flex flex-col text-center">
        <h1 className="text-3xl mb-6">MERN SOCIAL APP</h1>
        <input type="text" placeholder="Username" className="p-2 rounded-md mb-2 max-w-xs" />
        <input type="password" placeholder="Password" className="p-2 rounded-md mb-2 max-w-xs" />
        <button type="submit" className="my-2 bg-green-500 p-2 rounded-md">Sign up</button>
        <p className="text-sm">Already have an account? click <Link to="/login" className="text-blue-200 text-underline">here</Link></p>
      </form>
    </div>
  )
}
