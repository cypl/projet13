import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loggedOut } from "../store/loggerSlice"

function Header(){
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.logger.isLoggedIn)
    const firstName = useSelector(state => state.profile.firstName.payload)

    function logOut(){
        dispatch(loggedOut())
        sessionStorage.removeItem('auth')
        localStorage.removeItem('auth')
    }

    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src="/assets/argentBankLogo.png" alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {loggedUser ? 
                    <div>
                        <NavLink to="/user" className="main-nav-item">
                            <i className="fa fa-user-circle"></i> {firstName}
                        </NavLink>
                        <NavLink to="/" className="main-nav-item" onClick={logOut}>
                            <i className="fa fa-sign-out"></i> Sign Out
                        </NavLink>
                    </div>
                 :
                    <NavLink to="/signin" className="main-nav-item">
                        <i className="fa fa-user-circle"></i> Sign In
                    </ NavLink>
                 }
            </div>
        </nav>
    )

}

export default Header