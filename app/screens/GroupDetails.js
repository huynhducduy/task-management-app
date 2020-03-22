import { Button, Input, ListItem } from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { endpoint, GROUP, GROUP_MEMBER } from '../endpoints';
import { Get } from '../utils/api_caller';

export default function GroupDetails({ route, navigation }) {
  const [members, setMembers] = useState([]);
  const [mangerId, setManagerId] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const loadData = useCallback(
    function loadData(thisId) {
      Get({ to: endpoint(GROUP, { id: thisId }) })
        .then(res => {
          navigation.setOptions({ title: res.data.name });
          setManagerId(res.data.manager_id);
          setName(res.data.name);
          setDescription(res.data.description);
        })
        .catch(err => {
          console.log('WTF', err.response);
        });

      Get({ to: endpoint(GROUP_MEMBER, { id: thisId }) })
        .then(res => {
          setMembers(res.data);
        })
        .catch(err => {
          console.log('WTF', err.response);
        });
    },
    [navigation]
  );

  useEffect(() => {
    loadData(route.params.id);
  }, [route.params.id, loadData]);

  function keyExtractor(item, index) {
    index.toString();
  }

  function renderItem({ item }) {
    return (
      <ListItem
        title={item.username}
        onPress={() => {
          navigation.navigate('ProfileView', { id: item.id });
        }}
        bottomDivider
        chevron
      />
    );
  }

  return (
    <>
      <View
        style={{
          justifyContent: 'top',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          labelStyle={{ marginTop: 10 }}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          labelStyle={{ marginTop: 10 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Button title="Save" style={{ marginTop: 10 }} />
          <Button
            title="Delete"
            style={{ marginTop: 10, marginLeft: 10 }}
            buttonStyle={{ backgroundColor: 'red' }}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={members}
        renderItem={renderItem}
      />
    </>
  );
}
