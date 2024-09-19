import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  const register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Missing fields required', { duration: 3000 })
    } else if (!validateEmail(email)) {
      toast.error('Invalid email address', { duration: 3000 })
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match', { duration: 3000 })
    } else {
      await axios
        .post(
          'http://localhost:5000/api/v1/users/signup',
          {
            name: name,
            email: email,
            password: password, // Data to be sent in the request body
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
      <p className="text-3xl font-bold text-center">Register</p>
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="text"
        placeholder="Name"
        onChange={(ev) => setName(ev.target.value)}
      />
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
      <input
        className="w-[31rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-gray-500"
        type="password"
        placeholder="Confirm password"
        onChange={(ev) => setConfirmPassword(ev.target.value)}
      />
      <button
        className="w-[31rem] bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300"
        type="submit"
        onClick={register}
      >
        Register
      </button>
    </div>
  )
}

export default RegisterPage
