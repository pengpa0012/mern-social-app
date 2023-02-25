import Notiflix from "notiflix"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const [showDrawer, setShowDrawer] = useState(false)
  const onLogout = () => {
    setShowDrawer(false)
    Notiflix.Confirm.show(
      'Logout',
      'Are you sure?',
      'Logout',
      'Cancel',
      function okCb() {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        navigate("/login")
      },
      function cancelCb() {
      },
      {
        titleColor: '#fff',
        backgroundColor: "#242424",
        messageFontSize: '18px',
        messageColor: "#fff",
        okButtonBackground: '#ef4444'
      },
    )
  }

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/"><span className="p-3">Home</span></Link>
      <div className="relative">
        <h2 onClick={() => setShowDrawer(!showDrawer)} className="cursor-pointer p-3 font-bold border rounded-full w-12 h-12 text-center">{username?.charAt(0).toUpperCase()}</h2>
        <div className={`absolute bg-gray-700 -left-5 rounded-md ${showDrawer ? "block" : "hidden"}`}>
          <h2 className="mr-4 hover:bg-gray-800 w-full p-2 cursor-pointer" onClick={() => {
            setShowDrawer(false)
            navigate(`/profile/${username}`)
          }}>Profile</h2>
          <h2 onClick={() => onLogout()} className="p-2 cursor-pointer w-full hover:bg-gray-800 cursor-pointer">Logout</h2>
        </div>
      </div>
    </div>
  )
}
