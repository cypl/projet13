import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'

function Header({isLogged}){
    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src="/assets/argentBankLogo.png" alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {isLogged ? 
                    <div>
                        <NavLink to="/user" className="main-nav-item">
                            <i className="fa fa-user-circle"></i> Tony
                        </NavLink>
                        <NavLink to="/" className="main-nav-item">
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

Header.propTypes = {
    isLogged: PropTypes.bool,
  }