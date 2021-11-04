import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import itemsSlice from './ItemsSlice';
import cartSlice from './cartSlice';
export default configureStore({
  reducer: {
    user: userSlice,
    items: itemsSlice,
    cart: cartSlice,
  },
});
