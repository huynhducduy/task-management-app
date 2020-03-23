import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native';

import Group from './Group';
import QuickView from './Notification';
import Profile from './Profile';
import Task from './Task';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab
          title="Group"
          icon={style => <Icon {...style} name="account-group" />}
        />
        <BottomNavigationTab
          title="Task"
          icon={style => <Icon {...style} name="clipboard-text" />}
        />
        <BottomNavigationTab
          title="Notification"
          icon={style => <Icon {...style} name="bell" />}
        />
        <BottomNavigationTab
          title="Profile"
          icon={style => <Icon {...style} name="account" />}
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default function Home() {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Notification" component={QuickView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
