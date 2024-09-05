import Homepage from './components/Homepage'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
