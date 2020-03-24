import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useState } from 'react';

import { USERS } from '../endpoints';
import { Post } from '../utils/api_caller';

export default function ProfileCreate({ navigation }) {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  function create() {
    Post({
      to: USERS,
      data: {
        username,
        password,
        full_name: fullName,
      },
    })
      .then(res => navigation.navigate('ProfileView', { id: res.data.id }))
      .catch(() => alert('Cannot create this user'));
  }

  return (
    <>
      <TopNavigation
        title="Create user"
        alignment="center"
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="arrow-left" />
            )}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}
      >
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Input
          label="Full name"
          value={fullName}
          onChangeText={setFullName}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
          secureTextEntry
        />
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Button style={{ marginTop: 10 }} onPress={create}>
            Create
          </Button>
        </Layout>
      </Layout>
    </>
  );
}
