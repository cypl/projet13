import { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

// When params is undefined, here is the content of the page.
// Eg. User try to access an unknown URL
const defaultErrorMessage = ["404", "This page doesn't exist.", "Back to homepage", "/"]

// When params exists, it means there is an API error, 
// here are the contents based on code error from API response.
// Eg. User try to access an URL, but fetching data triggers an error
const errorMessages = new Map()
function setErrorMessage(code, message, btnMessage, url) {
    errorMessages.set( ''+code, [''+code, message, btnMessage, url])
}
setErrorMessage("400", "Your last connection seems too old. Please sign in again.", "Back to login", "/signin")
setErrorMessage("404", "Error connecting server.", "Back to homepage", "/")
setErrorMessage("500", "Internal Server Error.", "Back to homepage", "/")

/**
 * Displays content elements from Error page. Child element of Logged.jsx (page).
 * @returns {JSX.Element} - The JSX markup for the Error component.
 */
function Error(){
    const [errorFromAPI, setErrorFromAPI] = useState(false)
    const params = useParams().error
    const navigate = useNavigate()

    // When user try to access an unknown URL, redirection to /error
    useEffect(() => {
        if (![...errorMessages.keys()].includes(params)) {
            navigate("/error")
        } else {
            setErrorFromAPI(true)
        }
    },[navigate, params])
    
    return(
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
    )
}

export default Error
