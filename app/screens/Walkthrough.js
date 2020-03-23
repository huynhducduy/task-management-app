import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default function Walkthrough({ navigation }) {
  const slides = [
    {
      key: '1',
      title: 'Lorem ipsum',
      text: 'Dolor sit amet,\nconsectetur adipiscing elit',
      image: require('../assets/intro/list.png'), //eslint-disable-line
      backgroundColor: '#091C7A',
    },
    {
      key: '2',
      title: 'Sed do eiusmod',
      text: 'Tempor incididunt ut labore\net dolore magna aliqua',
      image: require('../assets/intro/team.png'), //eslint-disable-line
      backgroundColor: '#00524C',
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <Layout
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 100,
        }}
      >
        <Text category="h1" style={{ color: 'white' }}>
          {item.title}
        </Text>
        <Image source={item.image} resizeMode="center" />
        <Text category="h6" style={{ color: 'white' }}>
          {item.text}
        </Text>
      </Layout>
    );
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppIntroSlider
        renderItem={renderItem}
        slides={slides}
        onDone={() => navigation.navigate('Login')}
      />
    </>
  );
}
