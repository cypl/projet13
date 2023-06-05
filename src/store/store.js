import { configureStore } from "@reduxjs/toolkit"
import loggerSlice from "./loggerSlice"

export const store = configureStore({
  reducer: {
    logger: loggerSlice
  },
})