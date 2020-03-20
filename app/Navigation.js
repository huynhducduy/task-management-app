import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AuthContainer from './AuthContainer';
import Home from './screens/Home';
import Login from './screens/Login';
import Walkthrough from './screens/Walkthrough';

const Stack = createStackNavigator();

export default function() {
  const auth = AuthContainer.useContainer();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth.isLoggedIn ? (
          <>
            <Stack.Screen
              name="Walkthrough"
              component={Walkthrough}
              options={{ title: 'Walkthrough' }}
            />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Sen Task Management' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
