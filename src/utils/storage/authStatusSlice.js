import { createSlice } from '@reduxjs/toolkit'

export const authStatusSlice = createSlice({
  name: 'authStatus',
  initialState: {
    value: false,
  },
  reducers: {
    signedIn: state => {
      console.log('Signed in!');
      state.value = true
    },
    signedOut: state => {
      console.log('Signed out, good bye!')
      state.value = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { signedIn, signedOut } = authStatusSlice.actions;

export default authStatusSlice.reducer;