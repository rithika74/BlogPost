import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './DataSlice'

export const Store = configureStore({
  reducer: {
    userdata: counterReducer
  }
})