import { createSlice } from '@reduxjs/toolkit'

export const authStatusSlice = createSlice({
  name: 'authStatus',
  initialState: {
    value: false,
  },
  reducers: {
    signedIn: state => {
      state.value = true
    },
    signedOut: state => {
      state.value = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { signedIn, signedOut } = authStatusSlice.actions;

export default authStatusSlice.reducer;