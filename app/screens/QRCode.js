import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import QRCodeSvg from 'react-native-qrcode-svg';

function Scanner() {
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
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minWidth: '100%',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <Text />

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

export default function ProfileView() {
  const [index, setIndex] = useState(0);

  const buttons = ['Show', 'Scan'];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <ButtonGroup onPress={setIndex} selectedIndex={index} buttons={buttons} />
      <View
        style={{
          marginTop: 10,
        }}
      >
        {index === 0 ? <QRCodeSvg value="1" size={200} /> : <Scanner />}
      </View>
    </View>
  );
}
