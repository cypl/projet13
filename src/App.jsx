import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SiteTitle from './components/SiteTitle'
import Router from './router/Router'
import { useEffect } from 'react'
import { useFetchUserProfile } from './api'
import { getTokenFromStorage } from './utils/getTokenFromStorage'
import { useDispatch } from "react-redux"
import { loggedIn } from "./store/loggerSlice"
import { setFirstName, setLastName } from './store/profileSlice'

function App() {

  // Check if there is already a valid connection.

  const dispatch = useDispatch()
  const { FetchUserProfile, data, isLoaded, isError } = useFetchUserProfile()

  useEffect(() => {
    // Check if there is already a stored authentication token
    if((getTokenFromStorage() != null)){
        // Check if user profile can be fetched (in case JWT would be outdated)
        FetchUserProfile(getTokenFromStorage())
    }
  },[])

  useEffect(()=> {
    if (isLoaded) {
        // if data exist, data is sent to the store
        // this way, connection can be maintained between pages
        if(isError === null){
          data && dispatch(loggedIn())
          data && dispatch(setFirstName({name: data.firstName}))
          data && dispatch(setLastName({name: data.lastName}))
        }
    }
  }, [data, dispatch, isError, isLoaded])

  return (
    <BrowserRouter>
      <SiteTitle />
      <Router/>
    </BrowserRouter>
  )
}

export default App
