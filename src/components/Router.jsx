import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../layouts/SignIn'
import User from '../layouts/User'
import Error404 from '../pages/Error404'
import LoggedPage from '../pages/Logged'

function Router(){
    return(
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<LoggedPage><SignIn/></LoggedPage>} />
        <Route path="/user" element={<LoggedPage><User/></LoggedPage>} />
        <Route path="*" element={<Error404 />} />
    </Routes>)
}

export default Router