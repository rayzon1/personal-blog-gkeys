import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'signin',
  initialState: {
    username: "",
    password: ""
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
      state.password = action.payload.pass
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload.amount;
    // },
  },
});

export const selectCount = state => state.counter.value;
export const { setUser, setPw } = slice.actions;

export default slice.reducer;
