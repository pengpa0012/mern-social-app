import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Comment } from './Components/Comment'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Signup } from './pages/Signup'

function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showComment, setShowComment] = useState([{
    id: 0,
    isDisplayed: false
  }])

  // useEffect(() => {
  //   if(!isLoggedIn) {
  //    return navigate("/login")
  //   }
  // }, [isLoggedIn])
  
  const onShowComment = (id: number) => {
    setShowComment(prevItems => {
      const index = prevItems.findIndex(item => item.id === id);
      console.log(index)
      if (index === -1) {
        // item with given id doesn't exist, so add a new one
        return [...prevItems.filter(e => e?.id !== id && Object.keys(e).length !== 0), { id, isDisplayed: true }];
      } else {
        // item with given id exists, so update its isDisplayed property
        return [
          ...prevItems.slice(0, index),
          { ...prevItems[index], isDisplayed: !prevItems[index]?.isDisplayed },
          ...prevItems.slice(index + 1),
        ];
      }
    });
  }

  return (
    <div className="App">
      <div className="flex justify-between p-4">
        <h1>Logo</h1>
        <h2>User IMG</h2>
      </div>
      <div className="p-4">
        <ul className="mb-4 flex">
          <li className="mr-4">Following</li>
          <li>All Users</li>
        </ul>
        <Comment onShowComment={onShowComment} showComment={showComment} />
      </div>
    </div>
  )
}

export default App
