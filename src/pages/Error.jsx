import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'

function Error({errorStatus, errorMessage, redirectPath, buttonTxt}){
    return(
        <div className="root-wrapper">
            <Header/>
            <main className="main bg-dark">
                <p className="error-message">{errorMessage}</p>
                {errorStatus && <p className="error-code">Code error: {errorStatus}</p>}
                <NavLink to={redirectPath} className="redirect-link">
                    {buttonTxt}
                </NavLink>
            </main>
            <Footer/>
        </div>
    )

}

export default Error

Error.propTypes = {
    errorStatus: PropTypes.number,
    errorMessage: PropTypes.string,
    redirectPath: PropTypes.string,
    buttonTxt: PropTypes.string,
  }