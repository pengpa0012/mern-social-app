import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
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
  
  useEffect(() => {
    if(!isLoggedIn) {
     return navigate("/login")
    }
  }, [isLoggedIn])
  
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
        <div className="my-8">
          {
            [1,2,3].map((item, i) => (
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl mr-4">Test</h1>
                  <p>Date here</p>
                </div>  
                <p className="text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis cum, expedita similique nobis quibusdam facilis itaque maiores sed, quas unde ullam animi sit quae odio, voluptatum nesciunt! Dolore cum odio sit voluptatem dignissimos sunt, adipisci dolores neque deserunt quia aliquam necessitatibus enim. Molestiae asperiores nemo numquam quae ea. Perspiciatis, possimus!</p>
                <div className="flex my-4">
                  <button className="mr-4">Like</button>
                  <button onClick={() => onShowComment(i)}>Comment</button>
                </div>
                {
                  showComment[i]?.isDisplayed &&
                  <div className="p-4 bg-white/10 rounded-md">
                    {
                      [1,2,3].map((item, i) => (
                        <div className="my-2 bg-white/20 p-2 rounded-md" key={i}>
                          <div className="flex items-center">
                            <h1 className="mr-2">User</h1>
                            <p>Date</p>
                          </div>
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, enim!</p>
                        </div>
                      ))
                    }
                    <input type="text" className="w-full rounded-md p-2 bg-white/20 focus:outline-none" placeholder="Write a comment..." />
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
