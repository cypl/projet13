import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLogged, setLogged] = useState(false)
    const authStorageSession = sessionStorage.getItem('authStorage')
    const authStorageLocal = localStorage.getItem('authStorage')
    if((authStorageSession != null) || (authStorageLocal != null)){
        console.log("l'utilisateur est connecté")
        !isLogged && setLogged(true)
    }
    
    function logout(){
        isLogged && setLogged(false)
        authStorageSession != null && sessionStorage.removeItem('authStorage')
        authStorageLocal != null && localStorage.removeItem('authStorage')
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