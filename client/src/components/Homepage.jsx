import NavBar from './NavBar'
import Post from './Post'

const Homepage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <NavBar />
      <div className="gap-[8rem]">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Homepage
