import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="flex flex-row items-center justify-between min-w-full min-h-full pl-[7rem] pt-[2rem]">
      <Link to="/" className="text-3xl font-bold">
        MyBlog
      </Link>
      <div className="flex flex-row pr-[7rem] gap-[1rem]">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default NavBar
