import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../Components/Header'
import { Post } from '../Components/Post'

export const Profile = () => {
  const {id} = useParams()
  const [allPosts, setAllPosts] = useState([])
  const [profile, setProfile] = useState<any>({})
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

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
    }).then(data => setProfile(data.data.user))
  }, [])
  console.log(profile)
  return (
    <>
      <Header />
      <div className="p-4">
        <ul className='grid grid-cols-3 gap-12 pb-12'>
          <li>Name: {profile?.username}</li>
          <li>Age: {profile?.bio?.age}</li>
          <li>Birthday {profile?.bio?.birthday}</li>
          <li>Interests: {profile?.bio?.interests}</li>
          <li>Followers: {profile?.followers?.length}</li>
        </ul>
        <h2>Your posts</h2>
        <Post posts={allPosts.filter((posts: any) => posts.username == username)}  />
      </div>
    </>
  )
}
