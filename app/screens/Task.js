import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import ProfileView from './ProfileView';
import TaskCreate from './TaskCreate';
import TaskDetails from './TaskDetails';
import TaskList from './TaskList';

const Stack = createStackNavigator();

export default function Task() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(51, 102, 255)' }}>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
        <Stack.Screen name="TaskCreate" component={TaskCreate} />
        <Stack.Screen
          name="ProfileView"
          component={ProfileView}
          initialParams={{ from: 'Task' }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
