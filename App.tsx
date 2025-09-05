import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';
import { useAppTheme } from './src/utils/theme';
import LoadingScreen from './src/screens/LoadingScreen';
// AppWrapper to use theme hook inside Redux context
const AppWrapper = () => {
  const theme = useAppTheme();
  
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

// Main App component with Redux Provider
export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </ReduxProvider>
  );
}