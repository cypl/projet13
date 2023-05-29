import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import PropTypes from 'prop-types'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFetch } from "../api"

function SignIn({isLogged, setLogged}){

    const[loginEmail, setLoginEmail] = useState('')
    const[loginPassword, setLoginPassword] = useState('')
    const[loginRemember, setLoginRemember] = useState(false)
    const[loginData, setLoginData] = useState()
    const[errorData, setErrorData] = useState(null)
    
    // if user is already logged, redirect to "/user" page
    const navigate = useNavigate()
    useEffect(() => {
    isLogged && navigate("/user")},[isLogged, navigate])

    
    const { FetchLoginUser, data, isError } = useFetch() 
    const [isDataLoaded, setDataLoaded] = useState(false)

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
        setDataLoaded(true)
    }

    
      
    useEffect(() => {
        function populateStorage(loginEmail, loginData) {
            const authStorage = JSON.stringify({email: loginEmail, jwt: loginData})
            loginRemember ? 
                localStorage.setItem('authStorage', authStorage) : 
                sessionStorage.setItem('authStorage', authStorage)
        }
        if (isDataLoaded) { // Lorsque les données sont chargées,
            // On enregistre le statut de l'erreur
            setErrorData(isError)
            // S'il y a un token, on le stocke
            data.token && setLoginData(data.token)
            // S'il y a un token, on change le statut de connexion de l'utilisateur
            data.token && setLogged(true)
            // S'il y a un token, on mémorise la connexion de l'utilisateur
            data.token && populateStorage(loginEmail,loginData)
            // S'il y a un token, on redirige vers la page user
            isLogged && navigate("/user")
            // S'il n'y a pas de token et une d'erreur ?
            console.log(errorData)
        }
      }, [isDataLoaded, data, isError, setLogged, loginRemember, loginEmail, loginData, errorData, navigate, isLogged])

      

    return( 
        <> 
        {!isLogged &&      
        <div className="root-wrapper">
            <Header isLogged={isLogged}/>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleLoginSubmit}>
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

SignIn.propTypes = {
    isLogged: PropTypes.bool,
    setLogged: PropTypes.func,
  }