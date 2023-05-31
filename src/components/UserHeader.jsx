import PropTypes from 'prop-types'
import { useState } from 'react'
import { validStringInput } from '../utils/validStringInput'

function UserHeader({ firstName, lastName }){
    const [isModifying, setModifying] = useState(false)
    const [newFirstName, setNewFirstName] = useState(firstName)
    const [newLastName, setNewLastName] = useState(lastName)
    const [errorCounts, setErrorCounts] = useState(0)

    function cancelModifying(){
        setModifying(false)
        setErrorCounts(0)
    }
    
    function handleSubmit(event){
        event.preventDefault()
    }

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

UserHeader.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }