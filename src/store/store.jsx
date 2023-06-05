import { configureStore } from "@reduxjs/toolkit" //createStore looks deprecated ?

export default configureStore({
    reducer: {}
  })

// // There's only 3 global states in the app
// const initialState = {
//     isLogged: false,
//     firstName: "",
//     lastName: "",
// }

// // Actions
// const userLogIn = () => ({type: "Auth / user logged in"})
// const userLogOut = () => ({type: "Auth / user logged out"})
// const changeFirstName = (text) => ({type: "Profile / change first name", payload: text})
// const changeLastName = (text) => ({type: "Profile / change last name", payload: text})

// // Reducers
// function logReducer(state = initialState.isLogged, action) {
//     // Check to see if the reducer cares about this action
//     if (action.type === 'Auth / user logged in') {
//       // If so, make a copy of `state`
//       return {
//         ...state,
//         // and update the copy with the new value
//         value: !state.value
//       }
//     }
//     if (action.type === 'Auth / user logged out') {
//         return {
//           ...state,
//           value: !state.value
//         }
//       }
//     return state
//   }








