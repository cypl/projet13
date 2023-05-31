import { useState, useEffect, useContext } from 'react'
import { AuthContext, UserContext } from '../utils/Context'
import { useNavigate } from "react-router"
import { useFetchUserProfile } from '../api'

// retrieves Bearer Token from storage
function getValidToken(){
    const authSession = JSON.parse(sessionStorage.getItem('auth'))
    const authLocal = JSON.parse(localStorage.getItem('auth'))
    if(authSession != null){
        return authSession.jwt
    }else{
        return authLocal.jwt
    }
}

const accounts = [
    {
        name: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        amountDescription: "Available Balance",
    },
    {
        name: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        amountDescription: "Available Balance",
    },
    {
        name: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        amountDescription: "Current Balance",
    }
]


function User(){
    const { isLogged } = useContext(AuthContext)
    const { firstName, setFirstName, lastName, setLastName } = useContext(UserContext)
    const [ data, setData ] = useState(null)

    const { FetchUserProfile } = useFetchUserProfile()

    // if user is not logged, redirect to "/signin" page
    const navigate = useNavigate()
    useEffect(() => {
        !isLogged && navigate("/signin")
    },[isLogged, navigate])

    // get User Profile data
    useEffect(() => {
        async function getUserProfile(){
            const result = await FetchUserProfile(getValidToken(), setData)
            return result
        }
        if (!data) getUserProfile()
    },[FetchUserProfile, data])

    useEffect(()=> {
        data && setFirstName(data.firstName)
        data && setLastName(data.lastName)
    }, [data, setFirstName, setLastName])
    
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>

            <h2 className="sr-only">Accounts</h2>
            
            {accounts.map((a, index) => (
                <section className="account" key={index}>
                    <div className="account-content-wrapper">
                    <h3 className="account-title">{a.name}</h3>
                    <p className="account-amount">{a.amount}</p>
                    <p className="account-amount-description">{a.amountDescription}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </main>
    )
}
export default User