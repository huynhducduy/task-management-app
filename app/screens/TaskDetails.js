import {
  Icon,
  Layout,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

export default function TaskDetails({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuData = [
    {
      title: 'Start',
      icon: style => <Icon {...style} name="menu" />,
    },
    {
      title: 'Close',
      icon: style => <Icon {...style} name="menu" />,
    },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = index => {
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(51, 102, 255)' }}>
      <StatusBar barStyle="light-content" />
      <TopNavigation
        style={{ backgroundColor: 'rgb(51, 102, 255)' }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        title="Task Details"
        alignment="center"
        leftControl={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="arrow-left" />
            )}
            onPress={() => navigation.goBack()}
          />
        }
        rightControls={
          <OverflowMenu
            visible={menuVisible}
            data={menuData}
            onSelect={onMenuItemSelect}
            onBackdropPress={toggleMenu}
          >
            <TopNavigationAction
              icon={style => (
                <Icon {...style} style={{ color: 'white' }} name="menu" />
              )}
              onPress={toggleMenu}
            />
          </OverflowMenu>
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
