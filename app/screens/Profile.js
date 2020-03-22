import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfileMenu from './ProfileMenu';
import ProfileView from './ProfileView';
import QRCode from './QRCode';

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator initialRouteName="ProfileMenu" headerMode="none">
      <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{ title: 'QR' }}
      />
    </Stack.Navigator>
  );
}
