import { useParams } from 'react-router-dom'
import { Header } from '../Components/Header'
import { Post } from '../Components/Post'

export const Profile = () => {
  const {id} = useParams()

  return (
    <>
      <Header />
      <div className="p-4">
        <ul className='grid grid-cols-2 gap-12 pb-12'>
          <li>Name</li>
          <li>Age</li>
          <li>Birthday</li>
          <li>Interests</li>
        </ul>
        <h2>Your posts</h2>
        <Post />
      </div>
    </>
  )
}
