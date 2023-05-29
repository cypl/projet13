import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLogged, setLogged] = useState(false)
    const authSession = sessionStorage.getItem('auth')
    const authLocal = localStorage.getItem('auth')
    if((authSession != null) || (authLocal != null)){
        console.log("l'utilisateur est connecté")
        !isLogged && setLogged(true)
    }
    
    function logout(){
        isLogged && setLogged(false)
        authSession != null && sessionStorage.removeItem('auth')
        authLocal != null && localStorage.removeItem('auth')
    }
    return (
        <AuthContext.Provider
          value={{
            isLogged,
            setLogged,
            logout
          }}
        >
          {children}
        </AuthContext.Provider>
      )
    }

AuthProvider.propTypes = {
    children: PropTypes.any,
    }