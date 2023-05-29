import { useEffect, useContext } from 'react'
import { AuthContext } from '../utils/Context'
import { useNavigate } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

function User(){
    const { isLogged } = useContext(AuthContext)

    // if user is not logged, redirect to "/signin" page
    const navigate = useNavigate()
    useEffect(() => {
    !isLogged && navigate("/signin")},[isLogged, navigate])

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
    return (
        <div className="root-wrapper">
            <Header isLogged={isLogged}/>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
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