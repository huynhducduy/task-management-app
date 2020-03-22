import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { endpoint, ME, USER } from '../endpoints';
import { Get } from '../utils/api_caller';

export default function ProfileView({ navigation, route }) {
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [groupId, setGroupId] = useState();

  function save() {
    navigation.goBack();
  }

  function remove() {
    navigation.goBack();
  }

  const loadData = useCallback(function loadData(thisId) {
    let to;

    if (thisId === 'me') to = ME;
    else to = endpoint(USER, { id: thisId });

    Get({ to })
      .then(res => {
        setUsername(res.data.username);
        setFullName(res.data.full_name);
        setGroupId(res.data.group_id == null ? '' : `${res.data.group_id}`);
      })
      .catch(err => {
        console.log('WTF', err.response);
      });
  }, []);

  useEffect(() => {
    loadData(route.params.id);
  }, [route.params.id, loadData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'View Profile',
    });
  }, [navigation]);
  return (
    <>
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
        <Input
          label="Username"
          errorStyle={{ color: 'red' }}
          value={username}
          onChangeText={setUsername}
          labelStyle={{ marginTop: 10 }}
        />
        <Input
          label="Full name"
          onChangeText={setFullName}
          value={fullName}
          errorStyle={{ color: 'red' }}
          labelStyle={{ marginTop: 10 }}
        />
        <Input
          label="Group Id"
          errorStyle={{ color: 'red' }}
          value={groupId}
          onChangeText={setGroupId}
          labelStyle={{ marginTop: 10 }}
          keyboardType="number-pad"
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
    </>
  );
}
