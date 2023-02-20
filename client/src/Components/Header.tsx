import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <Link to="/">Logo</Link>
      <Link to="/profile/3412">
        <h2>User IMG</h2>
      </Link>
    </div>
  )
}
