import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Header } from './Components/Header'
import { Post } from './Components/Post'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  const [following, setFollowing] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) {
     return navigate("/login")
    }
  }, [isLoggedIn])
  
  const changeFeed = (following: boolean) => {
    setFollowing(following)
  }

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <ul className="mb-4 flex">
          <li className="mr-4 cursor-pointer" onClick={() => changeFeed(true)}>Following</li>
          <li className="cursor-pointer" onClick={() => changeFeed(false)}>All Users</li>
        </ul>
        {
          following ?
          <Post posts={[1,2,3]} />
          : <Post posts={[1,2,3,4,5,6]} />
        }
      </div>
    </div>
  )
}

export default App
