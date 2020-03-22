import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GroupCreate from './GroupCreate';
import GroupDetails from './GroupDetails';
import GroupList from './GroupList';
import ProfileView from './ProfileView';

const Stack = createStackNavigator();

export default function Group() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        initialParams={{ from: 'Group' }}
      />
    </Stack.Navigator>
  );
}
