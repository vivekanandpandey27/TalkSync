import {configureStore } from '@reduxjs/toolkit'
import  userReducer  from './createSlice.js'

const store = configureStore({
    reducer:{
      user:userReducer
    }
  })

  export default store;