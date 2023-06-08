import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: "",
    lastName: "",
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload.name
    },
    setLastName: (state, action) => {
      state.lastName = action.payload.name
    },
  },
})

export const { setFirstName, setLastName } = profileSlice.actions

export default profileSlice.reducer
