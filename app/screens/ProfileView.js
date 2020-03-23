import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import Loader from '../components/loader';
import { endpoint, ME, USER } from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Get } from '../utils/api_caller';

export default function ProfileView({ navigation, route }) {
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [groupId, setGroupId] = useState();

  const { setLoading } = LoadingContainer.useContainer();

  function save() {
    navigation.goBack();
  }

  function remove() {
    navigation.goBack();
  }

  function loadData() {
    let to;

    if (route.params.id === 'me') to = ME;
    else to = endpoint(USER, { id: route.params.id });

    Get({ to, setLoading })
      .then(res => {
        setUsername(res.data.username);
        setFullName(res.data.full_name);
        setGroupId(res.data.group_id == null ? '' : `${res.data.group_id}`);
      })
      .catch(err => {
        console.log('WTF', err.response);
      });
  }

  useLayoutEffect(useCallback(loadData, []), []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopNavigation
        title="Profile Details"
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
          paddingHorizontal: 10,
        }}
      >
        <Loader />
        <Input
          label="Username"
          errorStyle={{ color: 'red' }}
          value={username}
          onChangeText={setUsername}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Input
          label="Full name"
          onChangeText={setFullName}
          value={fullName}
          errorStyle={{ color: 'red' }}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Input
          label="Group Id"
          errorStyle={{ color: 'red' }}
          value={groupId}
          onChangeText={setGroupId}
          labelStyle={{ marginTop: 10 }}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button title="Save" style={{ marginTop: 10 }} onPress={save}>
            Save
          </Button>
          <Button
            style={{ marginTop: 10, marginLeft: 10 }}
            status="danger"
            onPress={remove}
          >
            Delete
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
}
