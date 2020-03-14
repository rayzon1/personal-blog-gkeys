import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import signinReducer from './redux/signinSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    signin: signinReducer,
  },
});
