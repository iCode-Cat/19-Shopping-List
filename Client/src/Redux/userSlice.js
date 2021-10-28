import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isAuthenticated: null,
  user: '',
  shoppingList: '',
};

export const fetchUser = createAsyncThunk('auth/api/user', async () => {
  const res = await axios.get('/api/auth/user', { withCredentials: true });
  return res.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuthManuel: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload === undefined) {
        state.isAuthenticated = false;
        return;
      }
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthenticated = false;
    });
  },
});

export const { userAuthManuel } = userSlice.actions;

export default userSlice.reducer;
