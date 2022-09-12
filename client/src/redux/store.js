import { configureStore } from '@reduxjs/toolkit'
import sharesReducer from "./sharesSlice"

const store = configureStore({
  reducer: {
    shares: sharesReducer,
  },
})

export default store;

