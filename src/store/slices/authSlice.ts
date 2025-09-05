import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import * as SecureStore from 'expo-secure-store';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        username: 'testuser',
        email,
      };
      
      const token = 'mock-jwt-token';
      
      // Store token securely
      await SecureStore.setItemAsync('userToken', token);
      
      return { user: userData, token };
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        username,
        email,
      };
      
      const token = 'mock-jwt-token';
      
      // Store token securely
      await SecureStore.setItemAsync('userToken', token);
      
      return { user: userData, token };
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('userToken');
  return null;
});

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    // In a real app, this would validate the token with an API
    // For demo purposes, we'll simulate a valid token
    
    // Mock user data
    const userData = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
    };
    
    return { user: userData, token };
  } catch (error) {
    return rejectWithValue('Authentication check failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
      })
      
      // Check Auth
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
