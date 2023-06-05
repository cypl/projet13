import { configureStore } from "@reduxjs/toolkit" //createStore looks deprecated ?
import loggerSlice from "./loggerSlice"

const store = () => configureStore({
    reducer: {
        logger: loggerSlice.reducer,
    }
  })

export default store