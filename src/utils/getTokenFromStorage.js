/**
 * Retrieves bearer token from storage.
 * @returns {String} - The bearer token string
 */
export function getTokenFromStorage(){
    const authSession = JSON.parse(sessionStorage.getItem('auth'))
    const authLocal = JSON.parse(localStorage.getItem('auth'))
    if(authSession != null){
        return authSession.jwt
    } else if (authLocal != null) {
        return authLocal.jwt
    }
}