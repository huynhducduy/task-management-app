import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { endpoint, GROUP, GROUP_MEMBER } from '../endpoints';
import { Get } from '../utils/api_caller';

function keyExtractor(item, index) {
  index.toString();
}

function renderItem({ item }) {
  return (
    <ListItem
      title={item.username}
      // onPress={this.onPress}
      bottomDivider
      chevron
    />
  );
}

export default function GroupDetails({ route, navigation }) {
  const [members, setMembers] = useState([]);

  const loadData = useCallback(
    function loadData(id) {
      Get({ to: endpoint(GROUP, { id }) })
        .then(res => {
          console.log(res.data);
          navigation.setOptions({ title: res.data.name });
        })
        .catch(err => {
          console.log('WTF', err.response);
        });

      Get({ to: endpoint(GROUP_MEMBER, { id }) })
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

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={members}
      renderItem={renderItem}
    />
  );
}
