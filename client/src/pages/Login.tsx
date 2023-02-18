import React from 'react'
import { Signup } from './Signup'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <form className="flex flex-col text-center">
        <h1 className="text-3xl mb-6">MERN SOCIAL APP</h1>
        <input type="text" placeholder="Username" className="p-2 rounded-md mb-2 max-w-xs" />
        <input type="password" placeholder="Password" className="p-2 rounded-md mb-2 max-w-xs" />
        <button type="submit" className="my-2 bg-green-500 p-2 rounded-md">Login</button>
        <p className="text-sm">Create an account? click <Link to="/signup" className="text-blue-200 text-underline">here</Link></p>
      </form>
    </div>
  )
}
