import { configureStore } from "@reduxjs/toolkit"
import loggerSlice from "./loggerSlice"
import profileSlice from "./profileSlice"

export const store = configureStore({
  reducer: {
    logger: loggerSlice,
    profile: profileSlice,
  },
})