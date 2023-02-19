import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  signup: boolean,
  onSubmit: (values: any) => void
}

export const FormCover = ({signup, onSubmit}: Props) => {
  return (
    <form className="flex flex-col text-center w-full max-w-xl px-2" onSubmit={onSubmit}>
      <h1 className="text-3xl mb-6">MERN SOCIAL APP</h1>
      <input type="text" placeholder="Username" className="p-2 rounded-md mb-2" name="username" />
      <input type="password" placeholder="Password" className="p-2 rounded-md mb-2" name="password"  />
      {
        signup &&
        <input type="password" placeholder="Repeat Password" className="p-2 rounded-md mb-2" name="repeat_password"  />
      }
      <button type="submit" className="mb-2 bg-green-500 hover:bg-green-600 p-2 rounded-md">{signup ? "Signup" : "Login"}</button>
      <p className="text-md">{signup ? "Create" : "Already have"} an account? click <Link to={signup ? "/login" : "/signup" } className="text-blue-200 text-underline">here</Link></p>
    </form>
  )
}
