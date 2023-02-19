import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Post } from './Components/Post'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Signup } from './pages/Signup'

function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(() => {
  //   if(!isLoggedIn) {
  //    return navigate("/login")
  //   }
  // }, [isLoggedIn])
  
  

  return (
    <div className="App">
      <div className="flex justify-between p-4">
        <h1>Logo</h1>
        <h2 onClick={() => navigate(`/profile/${Math.floor(Math.random() * 100)}`)}>User IMG</h2>
      </div>
      <div className="p-4">
        <ul className="mb-4 flex">
          <li className="mr-4">Following</li>
          <li>All Users</li>
        </ul>
        <Post />
      </div>
    </div>
  )
}

export default App
