// retrieves Bearer Token from storage
export function getTokenFromStorage(){
    const authSession = JSON.parse(sessionStorage.getItem('auth'))
    const authLocal = JSON.parse(localStorage.getItem('auth'))
    if(authSession != null){
        return authSession.jwt
    }else{
        return authLocal.jwt
    }
}