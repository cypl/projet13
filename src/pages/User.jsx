import { useEffect, useContext } from 'react'
import { AuthContext, UserContext } from '../utils/Context'
import { useNavigate } from "react-router"
import { useFetchUserProfile } from '../api'
import Header from "../components/Header"
import Footer from "../components/Footer"

function User(){
    const { isLogged } = useContext(AuthContext)
    const { firstName, setFirstName, lastName, setLastName} = useContext(UserContext)

    const { FetchUserProfile, data, isError } = useFetchUserProfile()

    // if user is not logged, redirect to "/signin" page
    const navigate = useNavigate()
    useEffect(() => {
        !isLogged && navigate("/signin")
    },[isLogged, navigate])

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
    
    // get User Profile data
    useEffect(() => {
        async function getUserProfile(){
            return await FetchUserProfile(getValidToken())
        }
        getUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    setFirstName(data.firstName)
    setLastName(data.lastName)

    return (
        <div className="root-wrapper">
            <Header isLogged={isLogged}/>
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
            <Footer />
        </div>
    )
}
export default User