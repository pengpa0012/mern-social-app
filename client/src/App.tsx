import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Header } from './Components/Header'
import { Post } from './Components/Post'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  const [postTab, setPostTab] = useState(true)
  const [followingList, setFollowingList] = useState<any[]>([])
  const [allPosts, setAllPosts] = useState([])
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
 
  const navigate = useNavigate()
  console.log(allPosts)
  useEffect(() => {
    if(!isLoggedIn) {
     return navigate("/login")
    }
  }, [isLoggedIn])

  useEffect(() => {
    axios.get("http://localhost:3000/post/getAllPosts", {
      headers: {
        "x-access-token": token
      }
    }).then(data => setAllPosts(data.data.Posts))

    axios.get(`http://localhost:3000/user/getUser?username=${username}`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => setFollowingList(data.data.user.following))
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <ul className="mb-4 flex">
          <li className="mr-4 cursor-pointer" onClick={() => setPostTab(true)}>Following</li>
          <li className="cursor-pointer" onClick={() => setPostTab(false)}>All Users</li>
        </ul>
        {
          postTab ?
          <Post posts={allPosts.filter((posts: any) => followingList.includes(posts.username))} setAllPosts={setAllPosts}/>
          : <Post posts={allPosts} setAllPosts={setAllPosts} />
        }
      </div>
    </div>
  )
}

export default App
