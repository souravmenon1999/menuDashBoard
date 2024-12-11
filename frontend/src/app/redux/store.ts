import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlices'

const store = configureStore({
  reducer: {
    menus: menuReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
