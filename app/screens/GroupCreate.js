import { Button } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import AuthContainer from '../AuthContainer';

export default function Profile() {
  const auth = AuthContainer.useContainer();
  function logout() {
    auth.setLoggedIn(false);
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Button onPress={logout} title="Logout" />
    </View>
  );
}
