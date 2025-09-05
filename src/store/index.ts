import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import settingsReducer from './slices/settingsSlice';

// Configure persist for each reducer
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'], // Only persist these fields
};

const tasksPersistConfig = {
  key: 'tasks',
  storage: AsyncStorage,
  whitelist: ['tasks'], // Only persist tasks array
};

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
  whitelist: ['settings'], // Only persist settings object
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

// Root reducer
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  tasks: persistedTasksReducer,
  settings: persistedSettingsReducer,
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
