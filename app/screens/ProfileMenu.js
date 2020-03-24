import { useFocusEffect } from '@react-navigation/native';
import {
  Icon,
  Layout,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';

import AuthContainer from '../AuthContainer';
import { ME } from '../endpoints';
import { Get } from '../utils/api_caller';
import clearAuth from '../utils/auth/clearAuth';

export default function ProfileView({ navigation }) {
  const auth = AuthContainer.useContainer();
  const [isAdmin, setIsAdmin] = useState(false);

  function loadData() {
    Get({ to: ME })
      .then(res => {
        setIsAdmin(res.data.is_admin);
      })
      .catch(err => {
        console.log('WTF', err.response);
      });
  }

  function logout() {
    clearAuth().then(() => {
      auth.setLoggedIn(false);
    });
  }

  useFocusEffect(useCallback(loadData, []), []);

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
          isAdmin && (
            <TopNavigationAction
              icon={style => (
                <Icon {...style} style={{ color: 'white' }} name="plus" />
              )}
              onPress={() => navigation.navigate('ProfileCreate')}
            />
          )
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
