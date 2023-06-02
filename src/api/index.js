import axios from 'axios'
import { useState } from 'react'

const ENV = 'http://localhost:3001/api/v1'
const loginPath = `${ENV}/user/login`
const profilePath = `${ENV}/user/profile`

// retrieves token authentication for a user
export function useFetchLoginUser() {
    const [data, setData] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [isError, setError] = useState()
  
    async function FetchLoginUser(email, password) {
        setLoaded(false)
        try {
            const response = await axios.post(
                loginPath, 
                { email, password }
            )
            setData(response.data.body)
            setError(null)
            setLoaded(true)
        } catch (error) {
            setError(error.response)
            setLoaded(true)
        }
    }
  
    return { FetchLoginUser, data, isLoaded, isError }
}

// retrieves user profile data, based on authentication token
export function useFetchUserProfile() {
    const [data, setData] = useState({});
    const [isLoaded, setLoaded] = useState(false)
    const [isError, setError] = useState()

    async function FetchUserProfile(token) {
        setLoaded(false)
        try {
            const response = await axios.post(
                profilePath, 
                {}, 
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            setData(response.data.body)
            setError(null)
            setLoaded(true)
        } catch (error) {
            setError(error.response)
            setLoaded(true)
        }
    }

    return { FetchUserProfile, data, isLoaded, isError }
}

// pushes user profile data changes to database
export function useFetchChangeUserProfile() {
    const [data, setData] = useState({});
    const [isError, setError] = useState();

    async function FetchChangeUserProfile(token, firstName, lastName) {
        try {
            const response = await axios.put(
                profilePath,
                { firstName, lastName },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setData(response.data.body)
            setError(null)
        } catch (error) {
            setError(error.response)
        }
    }

    return { FetchChangeUserProfile, data, isError }
}