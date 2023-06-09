import { Routes, Route } from 'react-router-dom'
import Home from '../layouts/Home'
import SignIn from '../layouts/SignIn'
import User from '../layouts/User'
import Error from '../layouts/Error'
import LoggedPage from '../pages/Logged'

/**
 * Displays the routes of the application.
 * @returns {JSX.Element} - The JSX markup for the Router component.
 */
function Router(){
    return(
        <Routes>
            <Route path="/" element={<LoggedPage><Home/></LoggedPage>} />
            <Route path="/signin" element={<LoggedPage><SignIn/></LoggedPage>} />
            <Route path="/user" element={<LoggedPage><User/></LoggedPage>} />
            <Route path="/error/:error" element={<LoggedPage><Error/></LoggedPage>} />
            <Route path="*" element={<LoggedPage><Error/></LoggedPage>} />
        </Routes>)
}

export default Router