import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';

export default function Notification({ navigation }) {
  return (
    <>
      <TopNavigation
        style={{ backgroundColor: 'rgb(51, 102, 255)' }}
        titleStyle={{ color: 'white', fontSize: 18 }}
        title="Notification"
        alignment="center"
        rightControls={
          <TopNavigationAction
            icon={style => (
              <Icon {...style} style={{ color: 'white' }} name="check-all" />
            )}
            // onPress={() => navigation.navigate('QRCode')}
          />
        }
      />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
        }}
      >
        {/* <Text>Notification</Text> */}
      </Layout>
    </>
  );
}
