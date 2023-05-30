import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import User from '../pages/User'
import Error404 from '../pages/Error404'

function Router(){
    return(
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/user" element={<User/>} />
        <Route path="*" element={<Error404 />} />
    </Routes>)
}

export default Router