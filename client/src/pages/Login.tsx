import React from 'react'
import { Signup } from './Signup'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <form className="flex flex-col text-center w-full max-w-xl px-2">
        <h1 className="text-3xl mb-6">MERN SOCIAL APP</h1>
        <input type="text" placeholder="Username" className="p-2 rounded-md mb-2" />
        <input type="password" placeholder="Password" className="p-2 rounded-md mb-2" />
        <button type="submit" className="mb-2 bg-green-500 hover:bg-green-600 p-2 rounded-md">Login</button>
        <p className="text-md">Create an account? click <Link to="/signup" className="text-blue-200 text-underline">here</Link></p>
      </form>
    </div>
  )
}
