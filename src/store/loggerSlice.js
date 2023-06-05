import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loggedIn, loggedOut } = loggerSlice.actions;

export default loggerSlice.reducer;
