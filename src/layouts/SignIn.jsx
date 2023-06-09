import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loggedIn } from "../store/loggerSlice"
import { useNavigate } from "react-router"
import { useFetchLoginUser } from "../api"
import InputField from "../components/InputField"

/**
 * Displays content elements from SignIn page. Child element of Logged.jsx (page).
 * @returns {JSX.Element} - The JSX markup for the SignIn component.
 */
function SignIn(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { FetchLoginUser, data, isLoaded, isError } = useFetchLoginUser()
    const loggedUser = useSelector((state) => state.logger.isLoggedIn)

    // store data from inputs
    const[loginEmail, setLoginEmail] = useState('')
    const[loginPassword, setLoginPassword] = useState('')
    const[loginRemember, setLoginRemember] = useState(false)

    // in case API return error
    const[errorData, setErrorData] = useState(null)
    const[errorMessage, setErrorMessage] = useState("")
    const [isErrorVisible, setIsErrorVisible] = useState(false)

    // check if input fields are valid
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

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
            setIsErrorVisible(true)
        }
        if (isLoaded) { // when FetchLoginUser is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            // if connection successful, token is stored in local state
            // if connection successful, user status changes
            data.token && dispatch(loggedIn())
            // if connection successful, 
            // user is redirected to "user" page
            if (data.token) {
                populateStorage(loginEmail, data.token)
                navigate("/user")
            }
            // if connection fails, an error pops in
            errorData != null && showErrorMessage(errorData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.token, dispatch, errorData, isError, isLoaded, loggedUser, loginRemember, navigate])

    // add a setTimeOut on API error message
    useEffect(() => {
        if (isErrorVisible) {
            const timeout = setTimeout(() => {
                setIsErrorVisible(false);
            }, 2000);
    
            return () => clearTimeout(timeout)
        }
    }, [isErrorVisible])

    return( 
        <> 
        {!loggedUser && 
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>

                    <InputField 
                        id={"email"} 
                        label={"Email"} 
                        type={"email"} 
                        setData={setLoginEmail} 
                        errorMessage={"Your email looks wrong."}
                        setValid={setEmailValid}/>
                    <InputField 
                        id={"password"} 
                        label={"Password"} 
                        type={"password"} 
                        setData={setLoginPassword} 
                        errorMessage={"Your password looks wrong."}
                        setValid={setPasswordValid}/>

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={loginRemember} onChange={handleLoginRemember}/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    
                    <button className={emailValid & passwordValid ? "sign-in-button" : "sign-in-button not-valid"}>Sign In</button>
                    
                    {isErrorVisible &&
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