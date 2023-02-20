import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Header } from './Components/Header'
import { Post } from './Components/Post'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(() => {
  //   if(!isLoggedIn) {
  //    return navigate("/login")
  //   }
  // }, [isLoggedIn])
  
  

  return (
    <div className="App">
      <Header />
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
