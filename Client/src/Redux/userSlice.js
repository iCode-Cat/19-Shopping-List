import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: '',
};

export const fetchUser = createAsyncThunk('auth/api/user', async () => {
  const res = await axios.get('/api/auth/user');
  return res.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    user: (state) => {
      state.value = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    });
  },
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
