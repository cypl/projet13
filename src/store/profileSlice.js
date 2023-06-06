import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: "",
    lastName: "",
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFirstName: (state, text) => {
      state.firstName = text
    },
    setLastName: (state, text) => {
      state.lastName = text
    },
  },
})

export const { setFirstName, setLastName } = profileSlice.actions

export default profileSlice.reducer
