import react from 'react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const appStore = configureStore({
  reducer: {
    // Reducers go here
    auth: authReducer,
  },
});

export default appStore;