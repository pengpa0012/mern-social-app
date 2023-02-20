import axios from 'axios'
import Notiflix from 'notiflix'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormCover } from '../Components/FormCover'

export const Signup = () => {
  const navigate = useNavigate()
  const onSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target
    const username = form.elements['username'].value
    const password = form.elements['password'].value
    const repeatPassword = form.elements['repeat_password'].value
    if(!username || !password || !repeatPassword || password !== repeatPassword) return
    axios.post(`http://localhost:3000/signup`, {
      username,
      password
    })
    .then(response => {
      Notiflix.Notify.success(response.data.message)
      navigate("/login")
    })
    .catch((err) => Notiflix.Notify.failure(err.response.data.message))
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <FormCover signup onSubmit={onSubmit} />
    </div>
  )
}
