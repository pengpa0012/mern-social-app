import axios from 'axios'
import Notiflix from 'notiflix'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../Components/Header'
import { Post } from '../Components/Post'

export const Profile = () => {
  const {id} = useParams()
  const [allPosts, setAllPosts] = useState<any>([])
  const [profile, setProfile] = useState<any>({})
  const [post, setPost] = useState({
    title: "",
    description: ""
  })
  const [isFollowing, setIsFollowing] = useState()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  useEffect(() => {
    axios.get("http://localhost:3000/post/getAllPosts", {
      headers: {
        "x-access-token": token
      }
    }).then(data => setAllPosts(data.data.Posts))

    axios.get(`http://localhost:3000/user/getUser?username=${id}`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => {
      setProfile(data.data.user)
      setIsFollowing(data.data.user.followers?.includes(username))
    })
  }, [id])

  const onPost = () => {
    if(!post.title || !post.description) return
    console.log(post.title, post.description)

    axios.post(`http://localhost:3000/post/createPost`, {
        username: id,
        title: post.title,
        description: post.description
      }, 
      {
      headers: {
        "x-access-token": token
      }
    })
    .then((response: any) => {
      setAllPosts([...allPosts, response.data.message])
      setPost({
        title: "",
        description: ""
      })
      Notiflix.Notify.success("Post Successfully")
    })
    .catch((err) => Notiflix.Notify.failure(err.response.data.message))
  }

  const handleFollow = (unfollow: boolean) => {
    axios.post(`http://localhost:3000/user/${unfollow ? "unFollowUser" : "followUser"}`, {
        username: username,
        user_following: unfollow ? undefined : id,
        user_unfollow: unfollow ? id : undefined,
      }, 
      {
        headers: {
          "x-access-token": token
        }
      }
    )
    .then((response: any) => {
      Notiflix.Notify.success(`${unfollow ? "Unfollow" : "Follow"} Successfully`)
    })
    .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
  }
  return (
    <>
      <Header />
      <div className="p-4">
        <ul className='grid grid-cols-3 gap-12 pb-12'>
          <li>
            <span className="mr-4">Name: {profile?.username}</span>
            {id != username && <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md" onClick={() => handleFollow(isFollowing ? true : false)}>{isFollowing ? "Unfollow"
             : "Follow"}</button>}
            </li>
          <li>Age: {profile?.bio?.age}</li>
          <li>Birthday {profile?.bio?.birthday}</li>
          <li>Interests: {profile?.bio?.interests}</li>
          <li>Followers: {profile?.followers?.length}</li>
        </ul>
       
       {id == username && <div className="flex flex-col p-3 rounded-md bg-white/5 mb-12">
          <p className="mb-4">Create Post</p>
          <input type="text" placeholder="Title" className="mb-2 rounded-md p-2" onChange={(e) => setPost({...post, title: e.target.value})} value={post.title} />
          <textarea placeholder="Description" className="rounded-md p-2 h-36 resize-none" onChange={(e) => setPost({...post, description: e.target.value})} value={post.description}></textarea>
          <button className="py-2 px-8 mt-3 bg-green-500 hover:bg-green-600 rounded-md flex self-start" onClick={() => onPost()}>Post</button>
        </div>}
        <h2 className="mb-4">{id == username ? "Your posts" : `${id}'s Posts`}</h2>
        <Post posts={allPosts.filter((posts: any) => id == username ? posts.username == username : posts.username == id)}  />
      </div>
    </>
  )
}
