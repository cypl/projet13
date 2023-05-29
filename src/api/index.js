import axios from 'axios'
import { useState } from 'react'

const ENV = 'http://localhost:3001/api/v1'
export const loginPath = `${ENV}/user/login`

// const useFetchLogin = (email, password, submitted, setData, setError) => {
//     useEffect(() => {
//       async function FetchLoginUser(email, password) {
//           await axios.post(loginPath, {
//               email,
//               password,
//           })
//           .then((response) => {
//               setData(response.data.body)
//               setError(null)
//           })
//           .catch((error) => {
//               setError(error.message)
//           })
//           }
//           FetchLoginUser(email, password)
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       },[submitted])
//   }
  
//   function FetchLogin(email, password, submitted){
//       const [data, setData] = useState({})
//       const [isError, setError] = useState()
//       useFetchLogin(email, password, submitted, setData, setError)
//       return {data, isError}
//   }
  
//   export const API = {
//       GetLoginData: (email, password, submitted) => {
//           return FetchLogin(email, password, submitted)
//       }
//   }




export function useFetchLoginUser() {
    const [data, setData] = useState({});
    const [isError, setError] = useState();
  
    async function FetchLoginUser(email, password) {
      try {
        const response = await axios.post(loginPath, {
          email,
          password,
        });
        setData(response.data.body)
        setError(null)
      } catch (error) {
        setError(error.response)
      }
    }
  
    return { FetchLoginUser, data, isError }
  }

  