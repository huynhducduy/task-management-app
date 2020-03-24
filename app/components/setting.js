import { Button, Divider, Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react';

export default function ProfileSetting() {
  return (
    <>
      <Layout
        level="1"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
        }}
      >
        <Text appearance="hint" category="s1">
          asdasdasd
        </Text>
        <Layout style={{ flexDirection: 'row' }}>
          <Text category="s1" style={{ marginTop: 2, marginRight: 10 }}>
            sdasdsd
          </Text>
          <Button
            size="tiny"
            icon={stylei => (
              <Icon {...stylei} name="pencil" style={{ marginHorizontal: 0 }} />
            )}
          />
        </Layout>
      </Layout>
      <Divider />
    </>
  );
}
