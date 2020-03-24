import { useFocusEffect } from '@react-navigation/native';
import {
  Icon,
  Layout,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { endpoint, NOTI, NOTIS } from '../endpoints';
import { Get, Post } from '../utils/api_caller';

export default function Notification() {
  const [notis, setNotis] = useState([]);

  function loadData() {
    Get({ to: NOTIS })
      .then(res => {
        setNotis(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  }

  function onPress(id, read) {
    if (!read)
      Post({ to: endpoint(NOTI, { id }) })
        .then(loadData)
        .catch(err => console.log(err.response));
  }

  function readAll() {
    Post({ to: NOTIS })
      .then(loadData)
      .catch(err => console.log(err.response));
  }

  useFocusEffect(useCallback(loadData, []), []);

  function renderItem({ item, index }) {
    console.log(item.message);
    return (
      <ListItem
        key={index}
        title={item.message}
        onPress={() => onPress(item.id, item.read)}
        icon={style => (
          <Icon
            {...style}
            style={{ display: !item.read ? 'flex' : 'none' }}
            name="circle-medium"
          />
        )}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(51, 102, 255)' }}>
      <StatusBar barStyle="light-content" />
      <TopNavigation
        style={{ backgroundColor: 'rgb(51, 102, 255)' }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        title="Notification"
        alignment="center"
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
              <Icon {...style} style={{ color: 'white' }} name="check-all" />
            )}
            onPress={readAll}
          />
        }
      />
      <Layout
        style={{
          flex: 1,
        }}
      >
        <List data={notis} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
}
