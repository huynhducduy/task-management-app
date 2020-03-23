import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useState } from 'react';

import { GROUPS } from '../endpoints';
import { Post } from '../utils/api_caller';

export default function GroupCreate({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function create() {
    Post({
      to: GROUPS,
      data: {
        name,
        description,
      },
    }).then(res => navigation.navigate('GroupDetails', { id: res.data.id }));
  }

  return (
    <>
      <TopNavigation
        title="Create group"
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
          label="Name"
          value={name}
          onChangeText={setName}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          labelStyle={{ marginTop: 10 }}
          autoCapitalize="none"
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
