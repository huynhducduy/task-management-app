import {
  Icon,
  Layout,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import AuthContainer from '../AuthContainer';
import clearAuth from '../utils/auth/clearAuth';

export default function ProfileView({ navigation }) {
  const auth = AuthContainer.useContainer();

  function logout() {
    clearAuth().then(() => {
      auth.setLoggedIn(false);
    });
  }

  return (
    <Layout>
      <TopNavigation
        title="Profile"
        alignment="center"
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="qrcode" />
            )}
            onPress={() => navigation.navigate('QRCode')}
          />
        }
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="plus" />
            )}
          />
        }
      />
      <ListItem
        key={0}
        icon={() => <Icon name="account-box" />}
        title="Me"
        onPress={() => navigation.navigate('ProfileView', { id: 'me' })}
      />
      <ListItem
        key={1}
        icon={() => <Icon name="logout" />}
        title="Logout"
        onPress={logout}
      />
    </Layout>
  );
}
