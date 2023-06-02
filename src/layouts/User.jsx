import { useEffect, useContext } from 'react'
import { AuthContext, UserContext } from '../utils/Context'
import { useNavigate } from "react-router"
import { useFetchUserProfile } from '../api'
import { getTokenFromStorage } from '../utils/getTokenFromStorage'
import UserHeader from '../components/UserHeader'



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
    const { isLogged, setLogged } = useContext(AuthContext)
    const { setFirstName, setLastName } = useContext(UserContext)
    const { FetchUserProfile, data, isLoaded, isError } = useFetchUserProfile()

    // if user is not logged, redirect to "/signin" page
    const navigate = useNavigate()
    useEffect(() => {
        !isLogged && navigate("/signin")
    },[isLogged, navigate])

    // then, we can fetch User Profile data using auth token
    useEffect(()=> {
        FetchUserProfile(getTokenFromStorage())
    }, [])

    useEffect(()=> {
        if (isLoaded) { // when data is loaded
            // if data exist, data is sent to context
            data && setFirstName(data.firstName)
            data && setLastName(data.lastName)
            // and we just assure user is logged
            data && setLogged(true)
            // if there is an error (eg: token was outdated, so user needs to authenticate again)
            if(isError != null) {
                navigate("/signin") 
                setLogged(false)
                console.log(isError)
            }
        }
    }, [data, isError, isLoaded, navigate, setFirstName, setLastName, setLogged])
    

    return (
        <main className="main bg-dark">
            <UserHeader/>
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