import { createSlice } from '@reduxjs/toolkit';

export const authInfoSlice = createSlice({
  name: 'authInfo',
  initialState: {
    value: null,
  },
  reducers: {
    setAuth: (state, payload) => {
      state.value = payload.value
    },
    clearAuth: state => {
      state.value = null
    }
  }
})

export const { setAuth, clearAuth } = authInfoSlice.actions;

export default authInfoSlice.reducers;