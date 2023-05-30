import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../utils/Context"
import { useNavigate } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFetchLoginUser } from "../api"

function SignIn(){
    const { isLogged, setLogged, authToken, setAuthToken } = useContext(AuthContext)

    const { FetchLoginUser, data, isError } = useFetchLoginUser()

    const[loginEmail, setLoginEmail] = useState('')
    const[loginPassword, setLoginPassword] = useState('')
    const[loginRemember, setLoginRemember] = useState(false)

    const [isDataLoaded, setDataLoaded] = useState(false)
    const[errorData, setErrorData] = useState(null)
    const[errorMessage, setErrorMessage] = useState("")
    
    // if user is already logged, redirect to "/user" page
    const navigate = useNavigate()
    useEffect(() => {
    isLogged && navigate("/user")},[isLogged, navigate])

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
        await FetchLoginUser(loginEmail, loginPassword) // = API call
        setDataLoaded(true) // when FetchLoginUser is finished, data are loaded
    }

      
    useEffect(() => {
        function populateStorage(loginEmail, loginData) {
            const authStorage = JSON.stringify({email: loginEmail, jwt: loginData})
            loginRemember ? 
                localStorage.setItem('auth', authStorage) : 
                sessionStorage.setItem('auth', authStorage)
        }
        function showError(errorData){
            if(errorData.status === 400){setErrorMessage("Username and/or password are invalid.")}
            else if(errorData.status === 404){setErrorMessage("Error connecting server.")}
            else if(errorData.status === 500){setErrorMessage("Internal Server Error.")}
            else{setErrorMessage("An error occured. Please, contact the support.")}
        }
        if (isDataLoaded) { // when FetchLoginUser is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            // if connection successful, token is stored in context
            data.token && setAuthToken(data.token)
            // if connection successful, user status changes
            data.token && setLogged(true)
            // if connection successful, user connection is stored (localStorage or sessionStorage)
            data.token && populateStorage(loginEmail,authToken)
            // if connection successful, user is redirected to "user" page
            isLogged && navigate("/user")
            // if connection fails, an error pops in
            errorData != null && showError(errorData)
        }
      }, [isDataLoaded, data, isError, setLogged, loginRemember, loginEmail, errorData, navigate, isLogged, setAuthToken, authToken])


    return( 
        <> 
        {!isLogged &&      
        <div className="root-wrapper">
            <Header isLogged={isLogged}/>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={loginEmail} onChange={handleLoginEmail}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={loginPassword} onChange={handleLoginPassword}/>
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
            <Footer />
        </div>
        }
        </>
        )
}
export default SignIn