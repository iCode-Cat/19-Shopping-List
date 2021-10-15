import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isAuthenticated: null,
  user: '',
};

export const fetchUser = createAsyncThunk('auth/api/user', async () => {
  const res = await axios.get('/api/auth/user', { withCredentials: true });
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

export const { user } = userSlice.actions;

export default userSlice.reducer;
