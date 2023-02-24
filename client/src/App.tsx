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
  const [showComment, setShowComment] = useState({
    show: false,
    index: 0
  })
 
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) {
     return navigate("/login")
    }
  }, [isLoggedIn])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}post/getAllPosts`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => setAllPosts(data.data.Posts))

    axios.get(`${import.meta.env.VITE_ENDPOINT}user/getUser?username=${username}`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => setFollowingList(data.data.user.following))
  }, [])

  const changeTab = (toggle: boolean) => {
    setShowComment({
      show: false,
      index: 0
    })
    setPostTab(toggle)
  }

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <ul className="mb-4 flex">
          <li className={`mr-4 cursor-pointer ${postTab ? "bg-white/5" : ""} rounded-md p-2`} onClick={() => changeTab(true)}>Following</li>
          <li className={`cursor-pointer ${!postTab ? "bg-white/5" : ""} rounded-md p-2`} onClick={() => changeTab(false)}>All Users</li>
        </ul>
        {
          postTab ?
          <Post allPost={allPosts} posts={allPosts.filter((posts: any) => followingList.includes(posts.username))} setAllPosts={setAllPosts} showComment={showComment} setShowComment={setShowComment}/>
          : <Post allPost={allPosts} posts={allPosts} setAllPosts={setAllPosts} showComment={showComment} setShowComment={setShowComment} />
        }
      </div>
    </div>
  )
}

export default App
