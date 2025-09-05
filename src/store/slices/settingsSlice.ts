import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, SettingsState } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState: SettingsState = {
  settings: {
    theme: 'system',
    notifications: true,
    language: 'en',
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  try {
    const settingsJson = await AsyncStorage.getItem('appSettings');
    return settingsJson ? JSON.parse(settingsJson) : initialState.settings;
  } catch (error) {
    throw new Error('Failed to fetch settings');
  }
});

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: Partial<AppSettings>) => {
    try {
      // Get current settings
      const settingsJson = await AsyncStorage.getItem('appSettings');
      const currentSettings = settingsJson ? JSON.parse(settingsJson) : initialState.settings;
      
      // Update settings
      const updatedSettings = { ...currentSettings, ...settings };
      
      // Store in AsyncStorage
      await AsyncStorage.setItem('appSettings', JSON.stringify(updatedSettings));
      
      return updatedSettings;
    } catch (error) {
      throw new Error('Failed to update settings');
    }
  }
);

// Settings slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      })
      
      // Update settings
      .addCase(updateSettings.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update settings';
      });
  },
});

export default settingsSlice.reducer;
