import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native-elements';

import GroupCreate from './GroupCreate';
import GroupDetails from './GroupDetails';
import GroupList from './GroupList';

const Stack = createStackNavigator();

export default function Group() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupList"
        options={{
          title: 'Groups',
          headerRight: ({ navigation }) => (
            <Button
              onPress={() => navigation.navigate('GroupCreate')}
              title="+"
              color="#fff"
            />
          ),
        }}
        component={GroupList}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={({ route }) => ({
          title: route.params.title || '',
        })}
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
