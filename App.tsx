import 'react-native-gesture-handler';

import { light as theme, mapping } from '@eva-design/eva';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React from 'react';
import { StatusBar } from 'react-native';

import AuthContainer from './app/AuthContainer';
import LoadingContainer from './app/LoadingContainer';
import MaterialCommunityIconsPack from './app/material-community-icons';
import Navigation from './app/Navigation';

export default function App() {
  return (
    <AuthContainer.Provider>
      <LoadingContainer.Provider>
        <IconRegistry icons={MaterialCommunityIconsPack} />
        <ApplicationProvider {...eva} mapping={mapping} theme={theme}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ApplicationProvider>
      </LoadingContainer.Provider>
    </AuthContainer.Provider>
  );
}
