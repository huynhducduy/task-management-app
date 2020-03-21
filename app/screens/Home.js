import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';

import Group from './Group';
import Profile from './Profile';
import QuickView from './QuickView';
import Task from './Task';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Group':
              iconName = focused ? 'account-group' : 'account-group-outline';
              break;
            case 'Task':
              iconName = focused ? 'card-text' : 'card-text-outline';
              break;
            case 'Quick View':
              iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              break;
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              type="material-community"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Quick View" component={QuickView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
