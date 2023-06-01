import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../utils/Context'
import { validStringInput } from '../utils/validStringInput'
import { useFetchChangeUserProfile } from '../api'
import { getTokenFromStorage } from '../utils/getTokenFromStorage'

function UserHeader(){
    const { FetchChangeUserProfile, data, isError } = useFetchChangeUserProfile()

    const { firstName, setFirstName, lastName, setLastName } = useContext(UserContext)
    const [isModifying, setModifying] = useState(false)
    const [newFirstName, setNewFirstName] = useState()
    const [newLastName, setNewLastName] = useState()
    const [errorCounts, setErrorCounts] = useState(0)

    // states used for Fetch hook :
    const[isDataLoaded, setDataLoaded] = useState(false)
    const[errorData, setErrorData] = useState(null)
    const[errorMessage, setErrorMessage] = useState("")

    function cancelModifying(){
        setModifying(false)
        setErrorCounts(0)
    }

    useEffect(() => {
        setNewFirstName(firstName)
        setNewLastName(lastName)
    },[firstName, lastName])
    
    async function handleSubmit(event){
        event.preventDefault()
        await FetchChangeUserProfile(getTokenFromStorage(), newFirstName, newLastName) // = API call
        setDataLoaded(true) // when FetchLoginUser is finished, data are loaded
    }
    useEffect(() => {
        function showError(errorData){
            if(errorData.status === 400){setErrorMessage("Username and/or password are invalid.")}
            else if(errorData.status === 404){setErrorMessage("Error connecting server.")}
            else if(errorData.status === 500){setErrorMessage("Internal Server Error.")}
            else{setErrorMessage("An error occured. Please, contact the support.")}
        }
        if (isDataLoaded) { // when FetchChangeUserProfile is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            data && setFirstName(data.firstName)
            data && setLastName(data.lastName)
            // if connection successful, token is stored in local state
            // if connection fails, an error pops in
            errorData != null && showError(errorData)
            setModifying(false)
        }
      }, [data, errorData, errorMessage, isDataLoaded, isError, setFirstName, setLastName])
    
    
    
    return(
        <div className="header">
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            {!isModifying ? (
                <button className="edit-button" onClick={() => setModifying(true)}>Edit Name</button>
                ) : (
                <form className="form_edit_profile" onSubmit={handleSubmit}>
                    <div className="form_edit_profile__group">
                        <div className="input-wrapper">
                            <label htmlFor="firstname">First name</label>
                            <input type="text" id="firstname" defaultValue={firstName} 
                            onChange={(event) => validStringInput(event, "text", setNewFirstName, setErrorCounts)}/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastname">Last name</label>
                            <input type="text" id="lastname" defaultValue={lastName} 
                            onChange={(event) => validStringInput(event, "text", setNewLastName, setErrorCounts)}/>
                        </div>
                    </div>
                    <button className={errorCounts > 0 ? "edit-button error" : "edit-button"}>Save changes</button>
                    <p className="form_edit_profile__cancel"><span onClick={() => cancelModifying()}>Cancel</span></p>
                </form>
                )
             }
        </div>
    )
}

export default UserHeader