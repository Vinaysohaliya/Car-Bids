import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice'; 
import vehiclesReducer from '../vehicle';

const store = configureStore({
  reducer: {
    user: userReducer,
    vehicles: vehiclesReducer,
  },
});

export default store;
