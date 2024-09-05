const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pb-[12rem] w-screen h-screen gap-[2rem]">
      <p className="text-3xl font-bold text-center">Register</p>
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="text"
        placeholder="Username"
      />
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="password"
        placeholder="Password"
      />
      <button
        className="w-[31rem] bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300"
        type="submit"
      >
        Register
      </button>
    </div>
  )
}

export default RegisterPage
