import axios from 'axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Missing fields required', { duration: 3000 })
    } else {
      await axios
        .post(
          'http://localhost:5000/api/v1/users/login',
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log('POST request response:', response.data)
          navigate('/')
        })
        .catch((error) => {
          console.error('Error with POST request:', error)
        })
    }
  }
  return (
    <div className="flex flex-col justify-center items-center pb-[12rem] w-screen h-screen gap-[2rem]">
      <p className="text-3xl font-bold text-center">Login</p>
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="text"
        placeholder="Email"
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="password"
        placeholder="Password"
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button
        className="w-[31rem] bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300"
        type="submit"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  )
}

export default LoginPage
