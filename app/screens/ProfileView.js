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
import { Get, Patch } from '../utils/api_caller';

export default function ProfileView({ navigation, route }) {
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [userId, setUserId] = useState();

  const { setLoading } = LoadingContainer.useContainer();

  function save() {
    Patch({
      to: endpoint(USER, { id: userId }),
      setLoading,
      data: { full_name: fullName },
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log('WTF', err.response);
      });
  }

  function loadData() {
    Get({ to: ME, setLoading })
      .then(res => {
        setIsAdmin(res.data.is_admin);
        setUserId(res.data.id);
        setUsername(res.data.username);
        setFullName(res.data.full_name);
      })
      .catch(err => {
        console.log('WTF', err.response);
      });

    if (route.params.id !== 'me') {
      Get({ to: endpoint(USER, { id: route.params.id }), setLoading })
        .then(res => {
          setUserId(res.data.id);
          setUsername(res.data.username);
          setFullName(res.data.full_name);
        })
        .catch(err => {
          console.log('WTF', err.response);
        });
    }
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
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
          disabled
        />
        <Input
          label="Full name"
          onChangeText={setFullName}
          value={fullName}
          errorStyle={{ color: 'red' }}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {(route.params.id === 'me' || isAdmin) && (
            <Button
              title="Save"
              style={{ marginTop: 10 }}
              onPress={save}
              icon={style => <Icon {...style} name="check" />}
            >
              Save
            </Button>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
}
