import { configureStore } from '@reduxjs/toolkit'
import authInfoSlice from './authInfoSlice';
import authStatusSlice from './authStatusSlice';

export default configureStore({
  reducer: {
    authStatus: authStatusSlice,
    authInfo: authInfoSlice
  },
})