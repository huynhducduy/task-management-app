import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { GROUPS } from '../endpoints';
import { Get } from '../utils/api_caller';

export default function GroupList({ navigation }) {
  const [groups, setGroups] = useState([]);

  function loadData() {
    Get({ to: GROUPS })
      .then(res => {
        setGroups(res.data);
      })
      .catch(err => {
        console.log('WTF', err.response);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  function keyExtractor(item, index) {
    index.toString();
  }

  function onPress(id) {
    navigation.navigate('GroupDetails', { id });
  }

  function renderItem({ item }) {
    return (
      <ListItem
        title={item.name}
        onPress={() => onPress(item.id)}
        bottomDivider
        chevron
      />
    );
  }
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={groups}
      renderItem={renderItem}
    />
  );
}
