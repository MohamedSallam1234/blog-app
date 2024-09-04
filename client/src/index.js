import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom/'
// import Homepage from './components/Homepage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Homepage /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
