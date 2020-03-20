import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import AuthContainer from './AuthContainer';
import Home from './screens/Home';
import Login from './screens/Login';
import Walkthrough from './screens/Walkthrough';
import isAuthenticated from './utils/auth/isAuthenticated';

const Stack = createStackNavigator();

export default function() {
  const auth = AuthContainer.useContainer();

  useEffect(() => {
    isAuthenticated().then(i => auth.setLoggedIn(i));
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={auth.isLoggedIn ? 'none' : 'float'}>
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
