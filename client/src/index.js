import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom/'
import { Toaster } from 'react-hot-toast'
// import Homepage from './components/Homepage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Homepage /> */}
      <Toaster />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
