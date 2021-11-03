import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import itemsSlice from './ItemsSlice';
export default configureStore({
  reducer: {
    user: userSlice,
    items: itemsSlice,
  },
});
