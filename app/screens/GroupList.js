import { useFocusEffect } from '@react-navigation/native';
import {
  Icon,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useLayoutEffect, useState } from 'react';

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

  useFocusEffect(useCallback(loadData, []), []);

  function onPress(id) {
    navigation.navigate('GroupDetails', { id });
  }

  function renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.name}
        onPress={() => onPress(item.id)}
        description={item.description}
        descriptionStyle={{ fontSize: 12 }}
        accessory={style => <Icon {...style} name="arrow-right" />}
      />
    );
  }
  return (
    <>
      <TopNavigation
        title="Group"
        alignment="center"
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="plus" />
            )}
            onPress={() => navigation.navigate('GroupCreate')}
          />
        }
      />
      <List data={groups} renderItem={renderItem} />
    </>
  );
}
