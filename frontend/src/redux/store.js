import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import chatReducer from './slice/chatSlice.js'
import socketReducer from './slice/socketSlice.js'
import messageReducer from './slice/msgSlice.js'

export const store = configureStore({
    reducer: {
        auth:authReducer,
        chat:chatReducer,
        socket:socketReducer,
        message:messageReducer
    },
  })