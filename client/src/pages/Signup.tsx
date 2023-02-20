import React from 'react'
import { Link } from 'react-router-dom'
import { FormCover } from '../Components/FormCover'
import { fetchData } from '../utilities'

export const Signup = () => {
  const onSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target
    const username = form.elements['username'].value
    const password = form.elements['password'].value
    const repeatPassword = form.elements['repeat_password'].value
    if(!username || !password || !repeatPassword) return
    fetchData("/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    })
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <FormCover signup onSubmit={onSubmit} />
    </div>
  )
}
