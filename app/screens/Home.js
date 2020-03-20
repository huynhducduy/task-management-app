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
      screenOptions={() => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = 'ios-information-circle';

          return <Icon name={iconName} size={size} color={color} />;
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
