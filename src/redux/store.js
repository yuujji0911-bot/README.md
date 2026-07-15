import { configureStore } from '@reduxjs/toolkit';
import studyReducer from './slices/studySlice';
import notesReducer from './slices/notesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    study: studyReducer,
    notes: notesReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
