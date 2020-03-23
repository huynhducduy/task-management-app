import { useFocusEffect } from '@react-navigation/native';
import {
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';

import Loader from '../components/loader';
import { GROUPS } from '../endpoints';
import LoadingContainer from '../LoadingContainer';
import { Get } from '../utils/api_caller';

export default function GroupList({ navigation }) {
  const [groups, setGroups] = useState([]);
  const { setLoading } = LoadingContainer.useContainer();
  const [searchValue, setSeachValue] = useState('');

  function loadData() {
    Get({ to: GROUPS, setLoading })
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
        icon={style => <Icon {...style} name="account-multiple" />}
        onPress={() => onPress(item.id)}
        description={item.description}
        descriptionStyle={{ fontSize: 12 }}
        accessory={style => <Icon {...style} name="chevron-right" />}
      />
    );
  }

  return (
    <>
      <TopNavigation
        title="Groups"
        alignment="center"
        style={{
          backgroundColor: 'rgb(51, 102, 255)',
        }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="reload" />
            )}
            onPress={loadData}
          />
        }
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="plus" />
            )}
            onPress={() => navigation.navigate('GroupCreate')}
          />
        }
      />
      <Layout style={{ flex: 1 }}>
        <Loader />
        <Input
          value={searchValue}
          placeholder="Search"
          icon={style => <Icon {...style} name="magnify" />}
          onChangeText={setSeachValue}
          style={{ margin: 10 }}
          autoCapitalize="none"
        />
        <List
          data={groups.filter(function filter(c) {
            return (
              searchValue === '' ||
              c.name.toLowerCase().includes(searchValue.toLowerCase())
            );
          })}
          renderItem={renderItem}
        />
      </Layout>
    </>
  );
}