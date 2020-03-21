import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfileView from './ProfileView';
import QRCode from './QRCode';

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileView"
        initialParams={{ load() {} }}
        component={ProfileView}
      />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{ title: 'QR' }}
      />
    </Stack.Navigator>
  );
}
