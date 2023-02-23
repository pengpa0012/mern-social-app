import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const [showDrawer, setShowDrawer] = useState(false)
  const onLogout = () => {
    if(confirm("Are you sure ?")) {
      localStorage.removeItem("token")
      navigate("/login")
    }
  }

  return (
    <div className="flex justify-between p-4">
      <Link to="/">Home</Link>
      <div className="relative">
        <h2 onClick={() => setShowDrawer(!showDrawer)} className="cursor-pointer">LOGO</h2>
        <div className={`absolute -left-6 bg-gray-700 rounded-md ${showDrawer ? "block" : "hidden"}`}>
          <Link to={`/profile/${username}`}>
            <h2 className="mr-4 hover:bg-gray-800 w-full p-2">Profile</h2>
          </Link>
          <h2 onClick={() => onLogout()} className="p-2 w-full hover:bg-gray-800 cursor-pointer">Logout</h2>
        </div>
      </div>
    </div>
  )
}
