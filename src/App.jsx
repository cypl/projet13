import './index.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Error404 from './pages/Error404'

function App() {

  // eslint-disable-next-line no-unused-vars
  const [isLogged, setLogged] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLogged={isLogged}/>}/>
        <Route path="/signin" element={<SignIn isLogged={isLogged}/>}/>
        <Route path="/user" element={<User isLogged={isLogged}/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
