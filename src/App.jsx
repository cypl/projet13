import './index.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Error404 from './pages/Error404'
import SiteTitle from './components/SiteTitle'

function App() {

  const [isLogged, setLogged] = useState(false)
  const authStorageSession = sessionStorage.getItem('authStorage')
  const authStorageLocal = localStorage.getItem('authStorage')
  if((authStorageSession != null) || (authStorageLocal != null)){
    console.log("connexion en cours")
  }

  return (
    <BrowserRouter>
      <SiteTitle/>
      <Routes>
        <Route path="/" element={<Home isLogged={isLogged}/>}/>
        <Route path="/signin" element={<SignIn isLogged={isLogged} setLogged={setLogged}/>}/>
        <Route path="/user" element={<User isLogged={isLogged}/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
