import Homepage from './components/Homepage'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register </h1>} />
      </Route>
    </Routes>
  )
}

export default App
