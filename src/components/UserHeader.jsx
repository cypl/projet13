import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../utils/Context'
import { validStringInput } from '../utils/validStringInput'
import { useFetchChangeUserProfile } from '../api'
import { getTokenFromStorage } from '../utils/getTokenFromStorage'

function UserHeader(){
    const { FetchChangeUserProfile, data, isLoaded, isError } = useFetchChangeUserProfile()

    const { firstName, setFirstName, lastName, setLastName } = useContext(UserContext)
    const [isModifying, setModifying] = useState(false)
    const [newFirstName, setNewFirstName] = useState()
    const [newLastName, setNewLastName] = useState()
    const [errorCounts, setErrorCounts] = useState(0)

    // states used for Fetch hook :
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
        await FetchChangeUserProfile(getTokenFromStorage(), newFirstName, newLastName)
    }

    useEffect(() => {
        function showError(errorData){
            if(errorData.status === 400){setErrorMessage("Username and/or password are invalid.")}
            else if(errorData.status === 404){setErrorMessage("Error connecting server.")}
            else if(errorData.status === 500){setErrorMessage("Internal Server Error.")}
            else{setErrorMessage("An error occured. Please, contact the support.")}
        }
        if (isLoaded) { // when Fetch is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            // if connection successful, firstName and lastName are sent to the context
            data && setFirstName(data.firstName)
            data && setLastName(data.lastName)
            // if connection fails, an error pops in
            errorData != null && showError(errorData)
            // then, if there's no error, we close the form
            errorData === null && setModifying(false)
        }
      }, [data, errorData, errorMessage, isLoaded, isError, setFirstName, setLastName])
    
    
    
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