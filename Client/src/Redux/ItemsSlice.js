import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  items: false,
  search: '',
  details: '',
  detailID: false,
  loading: false,
};

export const fetchItems = createAsyncThunk(
  '/api/items/category/find',
  async () => {
    const res = await axios.get(
      'https://shopping-api-test.herokuapp.com/api/items/category/find',
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    searchItem: (state, action) => {
      state.search = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setItem: (state, action) => {
      state.details = action.payload;
    },
    setId: (state, action) => {
      if (state.detailID === action.payload) return;
      state.detailID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      //   state.isAuthenticated = false;
    });
  },
});

export const { searchItem, setItem, setId, setLoading } = itemsSlice.actions;

export default itemsSlice.reducer;
