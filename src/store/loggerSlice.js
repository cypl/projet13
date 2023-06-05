import { createSlice } from '@reduxjs/toolkit'

export const loggerSlice = createSlice({
    name: 'logger',
    initialState: false,
    reducers: {
        loggedIn: (state) => {!state},
        loggedOut: (state) => {!state},
    },
})

export const { loggedIn, loggedOut } = loggerSlice.actions

export default loggerSlice