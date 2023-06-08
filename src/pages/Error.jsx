import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink, useParams, useLocation, useNavigate } from 'react-router-dom'

function Error(){
    const [errorFromAPI, setErrorFromAPI] = useState(false)
    const params = useParams().error
    const { pathname } = useLocation()
    const navigate = useNavigate()

    // When user try to access an unknown URL, redirection to /error
    useEffect(() => {
        if (!["/error/400", "/error/404", "/error/500"].includes(pathname)) {
            navigate("/error")
        } else {
            setErrorFromAPI(true)
        }
    },[navigate, pathname])

    // When params is undefined, here is the content of the page.
    // Eg. User try to access an unknown URL
    const defaultErrorMessage = ["404", "This page doesn't exist.", "Back to homepage", "/"]

    // When params exists, it means there is an API error, 
    // here are the contents based on code error from API response.
    // Eg. User try to access an URL, but fetching data triggers an error
    const errorMessages = new Map()
    errorMessages.set('400', ["400", "Your last connection seems too old. Please sign in again.", "Back to login", "/signin"])
    errorMessages.set('404', ["404", "Error connecting server.", "Back to homepage", "/"])
    errorMessages.set('500', ["500", "Internal Server Error.", "Back to homepage", "/"])

    return(
        <div className="root-wrapper">
            <Header/>
            <main className="main bg-dark">
                <p className="error-message">
                    {errorFromAPI ? 
                        errorMessages.get(params)[1]
                        : defaultErrorMessage[1]}
                </p>
                <p className="error-code">Code error: {errorFromAPI ? 
                        errorMessages.get(params)[0]
                        : defaultErrorMessage[0]}</p>
                <NavLink to={errorFromAPI ? 
                        errorMessages.get(params)[3]
                        : defaultErrorMessage[3]} className="redirect-link">
                    {errorFromAPI ? 
                        errorMessages.get(params)[2]
                        : defaultErrorMessage[2]}
                </NavLink>
            </main>
            <Footer/>
        </div>
    )

}

export default Error
