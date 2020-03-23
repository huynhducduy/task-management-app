import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

export default function Notification() {
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
            // onPress={loadData}
          />
        }
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="check-all" />
            )}
          />
        }
      />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
        }}
      />
    </SafeAreaView>
  );
}
