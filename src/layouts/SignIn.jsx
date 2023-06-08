import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loggedIn } from "../store/loggerSlice"
import { useNavigate } from "react-router"
import { useFetchLoginUser } from "../api"

function SignIn(){
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.logger.isLoggedIn)

    const { FetchLoginUser, data, isLoaded, isError } = useFetchLoginUser()

    const[loginEmail, setLoginEmail] = useState('')
    const[loginPassword, setLoginPassword] = useState('')
    const[loginRemember, setLoginRemember] = useState(false)
    const[errorData, setErrorData] = useState(null)
    const[errorMessage, setErrorMessage] = useState("")
    
    const navigate = useNavigate()

    useEffect(() => {
        // Check if there is already a stored authentication token
        const authSession = sessionStorage.getItem('auth')
        const authLocal = localStorage.getItem('auth')
        if((authSession != null) || (authLocal != null)){
            dispatch(loggedIn())
            navigate("/user")
        }
        // Or, if the user is already logged
        loggedUser && navigate("/user")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // form input functions
    function handleLoginEmail(event){
        setLoginEmail(event.target.value)
    }
    function handleLoginPassword(event){
        setLoginPassword(event.target.value)
    }
    function handleLoginRemember(){
        setLoginRemember(!loginRemember)
    }
    async function handleLoginSubmit(event){
        event.preventDefault()
        await FetchLoginUser(loginEmail, loginPassword)
    }

    useEffect(() => {
        function populateStorage(loginEmail, loginData) {
            const authStorage = JSON.stringify({email: loginEmail, jwt: loginData})
            loginRemember ? 
                localStorage.setItem('auth', authStorage) : 
                sessionStorage.setItem('auth', authStorage)
        }
        function showErrorMessage(errorData){
            if(errorData.status === 400){setErrorMessage("Username and/or password are invalid.")}
            else if(errorData.status === 404){setErrorMessage("Error connecting server.")}
            else if(errorData.status === 500){setErrorMessage("Internal Server Error.")}
            else{setErrorMessage("An error occured. Please, contact the support.")}
        }
        if (isLoaded) { // when FetchLoginUser is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            // if connection successful, token is stored in local state
           // data.token && setAuthToken(() => data.token)
            // if connection successful, user status changes
            data.token && dispatch(loggedIn())
            // if connection successful, 
            // user connection is stored (localStorage or sessionStorage)
            // user is redirected to "user" page
            if (data.token) {
                populateStorage(loginEmail, data.token)
                navigate("/user")
            }
            // if connection fails, an error pops in
            errorData != null && showErrorMessage(errorData)
        }
      }, [data.token, dispatch, errorData, isError, isLoaded, loggedUser, loginEmail, loginRemember, navigate])


    return( 
        <> 
        {!loggedUser && 
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={handleLoginEmail}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleLoginPassword}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={loginRemember} onChange={handleLoginRemember}/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                     <button className="sign-in-button">Sign In</button>
                     {errorData != null && 
                        <p className="sign-in-error-message">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                            </svg>
                            {errorMessage}
                        </p>}
                    </form>
                </section>
            </main>
        }
        </>
        )
}
export default SignIn