import axios from 'axios'
import Notiflix from 'notiflix'
import { useNavigate } from 'react-router-dom'
import { FormCover } from '../Components/FormCover'

export const Login = () => {
  const navigate = useNavigate()
  const onSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target
    const username = form.elements['username'].value
    const password = form.elements['password'].value
    if(!username || !password) return
    axios.post(`${import.meta.env.VITE_ENDPOINT}login`, {
      username,
      password
    })
    .then(response => {
      localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("username", username)
      localStorage.setItem("userId", response.data.result[0]._id)
      Notiflix.Notify.success(response.data.message)
      navigate("/")
    })
    .catch((err) => Notiflix.Notify.failure(err.response.data.message))
  }
  return (
    <div className="grid place-items-center min-h-screen">
      <FormCover signup={false} onSubmit={onSubmit} />
    </div>
  )
}
