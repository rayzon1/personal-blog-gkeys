import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

export const slice = createSlice({
  name: 'signin',
  initialState: {
    username: "",
    password: "",
    signedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
      // mutate the state because it uses the immer library, which detects
      // changes to a "draft state" and produces a brand new immutable state
      // based off those changes
      state.username = action.payload.user;
    },
    setPw: (state, action) => {
      state.password = action.payload.pass;
    },
    setSignIn: state => {
      state.signedIn = true;
    },
    clearSignIn: state => {
      state.signedIn = false;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload.amount;
    // },
  },
});

export const signedInState = state => state.signin.signedIn;
export const { setUser, setPw, setSignIn, clearSignIn } = slice.actions;

export default slice.reducer;
