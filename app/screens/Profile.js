import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import ProfileCreate from './ProfileCreate';
import ProfileMenu from './ProfileMenu';
import ProfileView from './ProfileView';
import QRCode from './QRCode';

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(51, 102, 255)' }}>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="ProfileMenu" headerMode="none">
        <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
        <Stack.Screen name="ProfileView" component={ProfileView} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
        <Stack.Screen
          name="QRCode"
          component={QRCode}
          options={{ title: 'QR' }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
