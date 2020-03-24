import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Select,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';

import { TASKS, TASKS_ASSIGNABLE, TASKS_REOPENABLE } from '../endpoints';
import { Get, Post } from '../utils/api_caller';

export default function TaskCreate({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reopenables, setReopenables] = useState([]);
  const [assignables, setAssinables] = useState([]);
  const [openFrom, setOpenFrom] = useState({});
  const [assignee, setAssignee] = useState({});

  function loadables() {
    Get({ to: TASKS_REOPENABLE }).then(res => {
      setReopenables(
        res.data.map(m => {
          return { text: m.name, id: m.id };
        })
      );
    });

    Get({ to: TASKS_ASSIGNABLE }).then(res => {
      setAssinables(
        res.data.map(m => {
          return { text: m.username, id: m.id };
        })
      );
    });
  }

  function create() {
    console.log({
      name,
      description,
      assignee,
      open_from: openFrom.id,
    });
    Post({
      to: TASKS,
      data: {
        name,
        description,
        assignee: assignee.id,
        open_from: openFrom.id,
      },
    }).then(res => navigation.navigate('TaskDetails', { id: res.data.id }));
  }

  useFocusEffect(useCallback(loadables, []), []);

  return (
    <>
      <TopNavigation
        title="Create task"
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
          paddingTop: 10,
        }}
      >
        <Select
          controlStyle={{ width: '100%' }}
          label="Open from"
          data={reopenables}
          textStyle={{ fontWeight: 'normal' }}
          selectedOption={openFrom}
          onSelect={data => setOpenFrom(data)}
        />
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
        <Select
          controlStyle={{ width: '100%' }}
          label="Assignee"
          data={assignables}
          textStyle={{ fontWeight: 'normal' }}
          selectedOption={assignee}
          onSelect={data => setAssignee(data)}
        />
        <Button
          style={{ marginTop: 15, width: '100%' }}
          onPress={create}
          icon={style => <Icon {...style} name="plus" />}
        >
          Create
        </Button>
      </Layout>
    </>
  );
}
