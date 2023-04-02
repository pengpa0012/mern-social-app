import axios from 'axios'
import dayjs from 'dayjs'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../Components/Header'
import { Post } from '../Components/Post'
import { storage } from '../utilities/firebase'
import { v4 } from "uuid";
import { bytesToSize, calculateAge } from '../utilities'

export const Profile = () => {
  const {id} = useParams()
  const [allPosts, setAllPosts] = useState<any>([])
  const [profile, setProfile] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({
    description: ""
  })
  const [updateProfile, setUpdateProfile] = useState<any>({
    profile_image: "",
    age: "",
    birthday: "",
    interest: ""
  })
  const [previewIMG, setPreviewIMG] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)
  const [isFollowing, setIsFollowing] = useState<boolean>()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const [showComment, setShowComment] = useState({
    show: false,
    index: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_ENDPOINT}post/getAllPosts`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => {
      setLoading(false)
      setAllPosts(data.data.Posts)
    })
    getUser()
  }, [id])

  const getUser = () => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}user/getUser?username=${id}`, {
      headers: {
        "x-access-token": token
      }
    }).then(data => {
      setProfile(data.data.user)
      setImageUrl(data.data.user.bio.profile_image)
      setIsFollowing(data.data.user.followers?.includes(username))
    })
  }

  const updateUser = (values: any) => {
    return axios.post(`${import.meta.env.VITE_ENDPOINT}user/editProfile`, {
      username,
      values
      }, 
      {
        headers: {
          "x-access-token": token
        }
      }
    )
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
    setIsLoading(true)
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
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      getUser()
      Notiflix.Notify.success(`${unfollow ? "Unfollow" : "Follow"} Successfully`)
    })
    .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
  }

  const onUpdateProfile = () => {
    setIsUpdate(false)
    updateUser({
      age: updateProfile.age || profile?.bio?.age,
      birthday: updateProfile.birthday || profile?.bio?.birthday,
      interests: updateProfile.interest || profile?.bio?.interests,
      profile_image: imageUrl
    }).then((response: any) => {
      getUser()
      Notiflix.Notify.success(`Update Successfully`)
    })
    .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
  }

  const onChangeProfile = (file: Blob | MediaSource) => {
    if(file) {
      const blob = window.URL.createObjectURL(file)
      setPreviewIMG(blob)
      setUpdateProfile({
        ...updateProfile,
        profile_image: file
      })
    }
  }

  const onUploadImage = () => {
    if(bytesToSize(updateProfile.profile_image.size).includes("MB")) {
      Notiflix.Notify.failure("Image size must be under 1MB")
      return
    }
    if(profile.bio.profile_image){
      const deletedImg = ref(storage, `${profile.bio.profile_image.split("/").at(-1).split("?")[0]}`)
      deleteObject(deletedImg)
    }
    const imageRef = ref(storage, `${updateProfile.profile_image.name + v4()}`);

    uploadBytes(imageRef, updateProfile.profile_image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateUser({
          age: profile?.bio?.age,
          birthday: profile?.bio?.birthday,
          interests: profile?.bio?.interests,
          profile_image: url
        }).then((response: any) => {
          getUser()
          setPreviewIMG("")
          setImageUrl(url)
          Notiflix.Notify.success(`Update Successfully`)
        })
        .catch((err) => Notiflix.Notify.failure(err.response?.data?.message))
      });
    });
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-start p-4 rounded-md mb-4 bg-white/5">
          <div className="text-center mb-12 md:mb-0">
            <div className="relative overflow-hidden flex justify-center">
              <img src={previewIMG || profile?.bio?.profile_image || "https://via.placeholder.com/200x200" } className="w-[200px] h-[200px] rounded-full object-cover" />
              {id == username ?
              <>
                <div className="group absolute inset-0 grid place-items-center rounded-full md:hover:bg-black/40">
                  <label htmlFor="file" className="cursor-pointer hidden group-hover:block">&#x1F4F7;</label>
                </div>
                <input type="file" id="file" className="hidden" onChange={(e) => onChangeProfile(e.target.files![0])}/>
              </>
              : undefined}
            </div>
            {
              previewIMG && 
              <div className="mt-4">
                <button className="bg-gray-500 hover:bg-gray-600 py-1 px-2 rounded-md text-sm mr-2" onClick={() =>  {
                    setUpdateProfile({
                    ...updateProfile,
                    profile_image: ""
                  })
                  setPreviewIMG("")
                }}>Cancel</button>
                <button className="bg-green-500 hover:bg-green-600 py-1 px-2 rounded-md text-sm" onClick={() => onUploadImage()}>Upload</button>
              </div>
            }
          </div>
          <div className="flex grow-[2] flex-col sm:flex-row justify-between items-start">
            <ul className="ml-4">
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Username: {profile?.username}</li>
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Age: {calculateAge(profile?.bio?.birthday || "") || "N/A"}</li>
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Birthday: {isUpdate ? <input defaultValue={dayjs(profile?.bio?.birthday).format("YYYY-MM-DD") || "N/A"} className="rounded-md px-2 py-1 bg-white/10" type="date" onKeyDown={(e) => {
                e.preventDefault()
              }} onChange={(e: any) => setUpdateProfile({...updateProfile, birthday: e.target.value})} /> : dayjs(profile?.bio?.birthday).format("MMM DD, YYYY")}</li>
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Interests: {isUpdate ? <input defaultValue={profile?.bio?.interests} className="rounded-md px-2 py-1 bg-white/10" onChange={(e: any) => setUpdateProfile({...updateProfile, interest: e.target.value})} /> : profile?.bio?.interests}</li>
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Followers: {profile?.followers?.length}</li>
              <li className="mb-1 sm:mb-2 text-sm sm:text-md">Following: {profile?.following?.length}</li>
            </ul>
            <div className="mx-auto md:mx-0 mt-4">
              {id != username && <button disabled={isLoading} className="text-xs bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md" onClick={() => handleFollow(isFollowing ? true : false)}>{isFollowing ? "Unfollow" : "Follow"}</button>}
              {id == username ?
                isUpdate ?
                <div>
                  <button className="bg-gray-500 hover:bg-gray-600 py-2 px-4 mr-2 rounded-md text-xs sm:text-md" onClick={() => setIsUpdate(false)}>Cancel</button>
                  <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-xs sm:text-md" onClick={() => onUpdateProfile()}>Save</button>
                </div>
                : <button className="bg-white/20 hover:bg-white/10 p-2 rounded-md text-xs sm:text-md" onClick={() => setIsUpdate(true)}>Update Profile</button>
                : undefined
              }
            </div>
          </div>
        </div>
       {id == username && <div className="flex flex-col p-3 rounded-md bg-white/5 mb-12">
          <p className="mb-4">Create Post</p>
          <textarea placeholder="Type here..." className="rounded-md p-2 h-36 resize-none bg-white/10" onChange={(e) => setPost({description: e.target.value})} value={post.description} maxLength={400}></textarea>
          <button className="py-2 px-8 mt-3 bg-green-500 hover:bg-green-600 rounded-md flex self-start text-sm sm:text-md" onClick={() => onPost()}>Post</button>
        </div>}
        <h2 className="mb-4">{id == username ? "Your posts" : `${id}'s Posts`}</h2>
        {loading ? <h1 className="text-center text-2xl py-12">Loading...</h1> : <Post allPost={allPosts} posts={allPosts.filter((posts: any) => id == username ? posts?.username == username : posts?.username == id)} setAllPosts={setAllPosts} showComment={showComment} setShowComment={setShowComment}  />}
      </div>
    </>
  )
}
