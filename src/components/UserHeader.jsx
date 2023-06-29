import { useState, useEffect } from 'react'
import { useFetchChangeUserProfile } from '../api'
import { getTokenFromStorage } from '../utils/getTokenFromStorage'
import { useSelector, useDispatch } from "react-redux"
import { setFirstName, setLastName } from '../store/profileSlice'
import InputField from './InputField'

/**
 * Displays the user name on profile page.
 * @returns {JSX.Element} - The JSX markup for the UserHeader component.
 */
function UserHeader(){
    const dispatch = useDispatch()
    const firstName = useSelector(state => state.profile.firstName)
    const lastName = useSelector(state => state.profile.lastName)

    const { FetchChangeUserProfile, data, isLoaded, isError } = useFetchChangeUserProfile()

    const [isModifying, setModifying] = useState(false)
    const [newFirstName, setNewFirstName] = useState()
    const [newLastName, setNewLastName] = useState()

    // states used for Fetch hook :
    const[errorData, setErrorData] = useState(null)
    const[errorMessage, setErrorMessage] = useState("")

    function cancelModifying(){
        setModifying(false)
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
            if(errorData.status === 400){setErrorMessage("Your last connection seems too old. Please signin again.")}
            else if(errorData.status === 404){setErrorMessage("Error connecting server.")}
            else if(errorData.status === 500){setErrorMessage("Internal Server Error.")}
            else{setErrorMessage("An error occured. Please, contact the support.")}
        }
        if (isLoaded) { // when Fetch is finished
            // save error response (will be "null" if connection is OK)
            setErrorData(isError)
            // if connection successful, firstName and lastName are sent to the context
            data && dispatch(setFirstName({name: data.firstName}))
            data && dispatch(setLastName({name: data.lastName}))
            // if connection fails, an error pops in
            errorData != null && showError(errorData)
            // then, if there's no error, we close the form
            errorData === null && setModifying(false)
            errorData != null && console.log(errorMessage)
        }
    }, [data, dispatch, errorData, errorMessage, isError, isLoaded])
    
    // check if input fields are valid
    const [firstNameValid, setFirstNameValid] = useState(true)
    const [lastNameValid, setLastNameValid] = useState(true)
    
    return(
        <div className="header">
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            {!isModifying ? (
                <button className="edit-button" onClick={() => setModifying(true)}>Edit Name</button>
                ) : (
                <form className="form_edit_profile" onSubmit={handleSubmit}>
                    <div className="form_edit_profile__group">

                        <InputField 
                            id={"firstname"} 
                            label={"First name"} 
                            type={"text"} 
                            defaultValue={firstName}
                            setData={setNewFirstName} 
                            errorMessage={"Special characters are not allowed."}
                            setValid={setFirstNameValid} 
                        />

                        <InputField 
                            id={"lastname"} 
                            label={"Last name"} 
                            type={"text"} 
                            defaultValue={lastName}
                            setData={setNewLastName} 
                            errorMessage={"Special characters are not allowed."}
                            setValid={setLastNameValid} 
                        />

                    </div>
                    <button className={firstNameValid & lastNameValid ? "edit-button" : "edit-button not-valid"}>Save changes</button>
                    <p className="form_edit_profile__cancel"><span onClick={() => cancelModifying()}>Cancel</span></p>
                </form>
                )
             }
        </div>
    )
}

export default UserHeader