import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';

import AuthContainer from '../AuthContainer';
import clearAuth from '../utils/auth/clearAuth';

export default function ProfileView({ navigation }) {
  const auth = AuthContainer.useContainer();

  function logout() {
    clearAuth().then(() => {
      auth.setLoggedIn(false);
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('QRCode')}
          icon={<Icon name="qrcode" type="material-community" />}
          color="#fff"
          type="clear"
        />
      ),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('GroupCreate')}
          icon={<Icon name="menu" type="entypo" />}
          color="#fff"
          type="clear"
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <ListItem
        key={1}
        leftAvatar={<Icon name="logout" type="material-community" />}
        title="Logout"
        bottomDivider
        onPress={logout}
      />
    </View>
  );
}
