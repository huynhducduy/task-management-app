import 'react-native-gesture-handler';

import { light as theme, mapping } from '@eva-design/eva';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AuthContainer from './app/AuthContainer';
import MaterialCommunityIconsPack from './app/material-community-icons';
import Navigation from './app/Navigation';

export default function App() {
  return (
    <AuthContainer.Provider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <IconRegistry icons={MaterialCommunityIconsPack} />
          <ApplicationProvider {...eva} mapping={mapping} theme={theme}>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </ApplicationProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthContainer.Provider>
  );
}
