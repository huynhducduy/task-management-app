import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GroupCreate from './GroupCreate';
import GroupDetails from './GroupDetails';
import GroupList from './GroupList';

const Stack = createStackNavigator();

export default function Group() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreate}
        options={{
          title: 'Create group',
        }}
      />
    </Stack.Navigator>
  );
}
