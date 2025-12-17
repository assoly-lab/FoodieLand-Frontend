import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { authService } from "@/services/api/auth.service";
import type { AuthResponse, SignInCredentials } from "@/types/shared/Auth";
import type { ApiErrorResponse } from "@/types/shared/Api";

export const register = createAsyncThunk<
  AuthResponse,
  FormData,
  { rejectValue: ApiErrorResponse }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    toast.success("Successfully registered!");
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data.error) {
        return rejectWithValue({
          success: error.response.data.success,
          error: error.response.data.error,
        });
      } else {
        return rejectWithValue({ success: false, error: error.message });
      }
    }
    return rejectWithValue({
      success: false,
      error: "Failed to register",
    });
  }
});

export const signIn = createAsyncThunk<
  AuthResponse,
  SignInCredentials,
  { rejectValue: ApiErrorResponse }
>("auth/signIn", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.signIn({
      ...credentials,
    });

    toast.success("Successfully signed in!");
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data.error) {
        return rejectWithValue({
          success: error.response.data.success,
          error: error.response.data.error,
        });
      } else {
        return rejectWithValue({ success: false, error: error.message });
      }
    }
    return rejectWithValue({
      success: false,
      error: "Failed to sign in",
    });
  }
});

export const signOut = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ApiErrorResponse;
  }
>("auth/signOut", async (_, { rejectWithValue }) => {

  try {
    await authService.signOut();
    toast.success("Successfully signed out!");
    return;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data.error) {
        return rejectWithValue({
          success: error.response.data.success,
          error: error.response.data.error,
        });
      } else {
        return rejectWithValue({ success: false, error: error.message });
      }
    }
    return rejectWithValue({ success: false, error: "Failed to sign out" });
  }
});

export const refreshToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: ApiErrorResponse }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.refreshToken();
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data.error) {
        return rejectWithValue({
          success: error.response.data.success,
          error: error.response.data.error,
        });
      } else {
        return rejectWithValue({ success: false, error: error.message });
      }
    }
    return rejectWithValue({
      success: false,
      error: "Failed to refresh token",
    });
  }
});
