import axios from 'axios'
import dayjs from 'dayjs'
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
    description: ""
  })
  const [updateProfile, setUpdateProfile] = useState({
    age: "",
    birthday: "",
    interest: ""
  })
  const [isUpdate, setIsUpdate] = useState(false)
  const [isFollowing, setIsFollowing] = useState<boolean>()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const [showComment, setShowComment] = useState({
    show: false,
    index: 0
  })

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}post/getAllPosts`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => setAllPosts(data.data.Posts))
    getUser()
  }, [id])

  const getUser = () => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}user/getUser?username=${id}`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => {
      setProfile(data.data.user)
      setIsFollowing(data.data.user.followers?.includes(username))
    })
  }

  const onPost = () => {
    if(!post.description) return

    axios.post(`${import.meta.env.VITE_ENDPOINT}post/createPost`, {
        username: id,
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
        description: ""
      })
      Notiflix.Notify.success("Post Successfully")
    })
    .catch((err) => Notiflix.Notify.failure(err.response.data.message))
  }

  const handleFollow = (unfollow: boolean) => {
    axios.post(`${import.meta.env.VITE_ENDPOINT}user/${unfollow ? "unFollowUser" : "followUser"}`, {
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
      getUser()
      Notiflix.Notify.success(`${unfollow ? "Unfollow" : "Follow"} Successfully`)
    })
    .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
  }
  const onUpdateProfile = () => {
    setIsUpdate(false)
    axios.post(`${import.meta.env.VITE_ENDPOINT}user/editProfile`, {
      username,
      values: {
        age: updateProfile.age || profile?.bio?.age,
        birthday: updateProfile.birthday || profile?.bio?.birthday,
        interests: updateProfile.interest || profile?.bio?.interests,
      }
    }, 
    {
      headers: {
        "x-access-token": token
      }
    }
  )
  .then((response: any) => {
    getUser()
    Notiflix.Notify.success(`Update Successfully`)
  })
  .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-start p-4 rounded-md mb-4 bg-white/5">
          <ul>
            <li className="mb-2">Username: {profile?.username}</li>
            <li className="mb-2">Age: {isUpdate ? <input defaultValue={profile?.bio?.age} className="rounded-md px-2 py-1" onChange={(e: any) => setUpdateProfile({...updateProfile, age: e.target.value})} /> : profile?.bio?.age}</li>
            <li className="mb-2">Birthday: {isUpdate ? <input defaultValue={dayjs(profile?.bio?.birthday).format("YYYY-MM-DD")} className="rounded-md px-2 py-1" type="date" onChange={(e: any) => setUpdateProfile({...updateProfile, birthday: e.target.value})} /> : dayjs(profile?.bio?.birthday).format("MMM DD, YYYY")}</li>
            <li className="mb-2">Interests: {isUpdate ? <input defaultValue={profile?.bio?.interests} className="rounded-md px-2 py-1" onChange={(e: any) => setUpdateProfile({...updateProfile, interest: e.target.value})} /> : profile?.bio?.interests}</li>
            <li className="mb-2">Followers: {profile?.followers?.length}</li>
            <li className="mb-2">Following: {profile?.following?.length}</li>
          </ul>
          {id != username && <button className="text-xs bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md" onClick={() => handleFollow(isFollowing ? true : false)}>{isFollowing ? "Unfollow" : "Follow"}</button>}
          {id == username ?
            isUpdate ?
            <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md" onClick={() => onUpdateProfile()}>Save</button>
            : <button className="bg-white/20 hover:bg-white/10 p-2 rounded-md" onClick={() => setIsUpdate(true)}>Update Profile</button>
            : undefined
          }
        </div>
       {id == username && <div className="flex flex-col p-3 rounded-md bg-white/5 mb-12">
          <p className="mb-4">Create Post</p>
          {/* <input type="text" placeholder="Title" className="mb-2 rounded-md p-2" onChange={(e) => setPost({...post, title: e.target.value})} value={post.title} /> */}
          <textarea placeholder="Type here..." className="rounded-md p-2 h-36 resize-none" onChange={(e) => setPost({description: e.target.value})} value={post.description} maxLength={400}></textarea>
          <button className="py-2 px-8 mt-3 bg-green-500 hover:bg-green-600 rounded-md flex self-start" onClick={() => onPost()}>Post</button>
        </div>}
        <h2 className="mb-4">{id == username ? "Your posts" : `${id}'s Posts`}</h2>
        <Post allPost={allPosts} posts={allPosts.filter((posts: any) => id == username ? posts.username == username : posts.username == id)} setAllPosts={setAllPosts} showComment={showComment} setShowComment={setShowComment}  />
      </div>
    </>
  )
}
