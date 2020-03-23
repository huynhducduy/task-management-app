import {
  Icon,
  Layout,
  Tab,
  TabView,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';

function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type === 'org.iso.QRCode') {
      setScanned(true);
      navigation.navigate('ProfileView', { id: data });
    }
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout
      style={{
        flex: 1,
        minWidth: '100%',
        minHeight: '100%',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Layout>
  );
}

export default function ProfileView({ navigation }) {
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, minHeight: '100%' }}>
        <TopNavigation
          title="QR Code"
          alignment="center"
          style={{
            backgroundColor: 'rgb(51, 102, 255)',
          }}
          titleStyle={{ color: 'white', fontSize: 18 }}
          leftControl={
            <TopNavigationAction
              icon={style => (
                <Icon {...style} style={{ color: 'white' }} name="arrow-left" />
              )}
              onPress={() => navigation.goBack()}
            />
          }
        />
        <TabView selectedIndex={index} onSelect={setIndex}>
          <Tab icon={style => <Icon {...style} name="qrcode" />}>
            <Layout
              style={{
                minHeight: '100%',
                minWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Layout
                style={{
                  transform: [{ translateY: '-100%' }],
                }}
              >
                <QRCodeSvg value="1" size={250} />
              </Layout>
            </Layout>
          </Tab>
          <Tab icon={style => <Icon {...style} name="qrcode-scan" />}>
            <Scanner navigation={navigation} />
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaView>
  );
}
