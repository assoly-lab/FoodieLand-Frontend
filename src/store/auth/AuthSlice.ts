import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/shared/Auth';
import { refreshToken, signIn, signOut } from './AuthThunk';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error as string;
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;
    });

    builder.addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
