import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../layouts/SignIn'
import User from '../layouts/User'
import Error from '../pages/Error'
import LoggedPage from '../pages/Logged'

function Router(){
    return(
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<LoggedPage><SignIn/></LoggedPage>} />
        <Route path="/user" element={<LoggedPage><User/></LoggedPage>} />
        <Route path="*" element={<Error errorStatus={404} errorMessage={"This page doesn't exist."} redirectPath={"/"} buttonTxt={"Back to homepage"}/>} />
    </Routes>)
}

export default Router