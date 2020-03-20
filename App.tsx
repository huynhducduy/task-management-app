import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
  // SafeAreaView,
} from 'react-native-safe-area-context';

import AuthContainer from './app/AuthContainer';
import Navigation from './app/Navigation';

export default function App() {
  return (
    <AuthContainer.Provider>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <ThemeProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthContainer.Provider>
  );
}
