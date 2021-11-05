import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  flow: 'list',
  list: [],
};

export const fetchCart = createAsyncThunk(
  '/api/items/category/find',
  async () => {
    const res = await axios.get('/api/items/category/find', {
      withCredentials: true,
    });
    return res.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setFlow: (state, action) => {
      state.flow = action.payload;
    },
    addItem: (state, action) => {
      const find = state.list.find(
        (item) => item.itemId === action.payload.itemId
      );
      // increase  quantity
      if (find) {
        const index = state.list.findIndex(
          (obj) => obj.itemId === action.payload.itemId
        );
        state.list[index].quantity += 1;
        return;
      }
      state.list = [...state.list, action.payload];
    },
    removeItem: (state, action) => {
      const filter = state.list.filter(
        (item) => item.itemId !== action.payload
      );
      state.list = filter;
    },
    quantityHandler: (state, action) => {
      const find = state.list.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (find) {
        const index = state.list.findIndex(
          (obj) => obj.itemId === action.payload.itemId
        );
        switch (action.payload.type) {
          case 'increment':
            state.list[index].quantity += 1;
            break;
          case 'decrement':
            state.list[index].quantity -= 1;
            if (state.list[index].quantity < 1) {
              state.list[index].quantity = 1;
            }
            break;
          default:
            console.log('Please pass a type of inc or dec');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {});
    builder.addCase(fetchCart.rejected, (state, action) => {
      //   state.isAuthenticated = false;
    });
  },
});

export const { setFlow, addItem, removeItem, quantityHandler } =
  cartSlice.actions;

export default cartSlice.reducer;
