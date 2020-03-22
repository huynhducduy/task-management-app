import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Icon, ListItem } from '@ui-kitten/components';

import { GROUPS } from '../endpoints';
import { Get } from '../utils/api_caller';
import randomString from '../utils/randomString';

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Groups',
      headerLeft: () => (
        <Button
          onPress={loadData}
          icon={<Icon name="reload" type="material-community" />}
          color="#fff"
          type="clear"
        />
      ),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('GroupCreate')}
          icon={<Icon name="plus" type="entypo" />}
          color="#fff"
          type="clear"
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(function onFocus() {
      // navigation.setParams({ load: loadData });
      loadData();
    }, []),
    []
  );

  function keyExtractor(item, index) {
    index.toString();
  }

  function onPress(id) {
    navigation.navigate('GroupDetails', { id });
  }

  function renderItem({ item }) {
    return (
      <ListItem
        key={randomString(3)}
        title={item.name}
        onPress={() => onPress(item.id)}
        subtitle={item.description}
        subtitleStyle={{ fontSize: 12 }}
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
