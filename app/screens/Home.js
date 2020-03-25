import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { NOTIS } from '../endpoints';
import { Put } from '../utils/api_caller';
import Group from './Group';
import QuickView from './Notification';
import Profile from './Profile';
import Task from './Task';

const Tab = createBottomTabNavigator();

async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  Put({
    to: NOTIS,
    params: { token: token.replace('ExponentPushToken[', '').replace(']', '') },
  }).catch();
}

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
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Notification" component={QuickView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
