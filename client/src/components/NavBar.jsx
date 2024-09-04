const NavBar = () => {
  return (
    <div className="flex flex-row items-center justify-between min-w-full min-h-full pl-[7rem] pt-[2rem]">
      <a href="/homepage" className="text-3xl font-bold">
        MyBlog
      </a>
      <div className="flex flex-row pr-[7rem] gap-[1rem]">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  )
}

export default NavBar
