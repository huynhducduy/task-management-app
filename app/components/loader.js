import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native';

import Loading from '../LoadingContainer';

export default function Loader() {
  const loading = Loading.useContainer();

  return (
    <SafeAreaView
      style={{
        display: loading.isLoading ? 'block' : 'none',
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size="giant" />
    </SafeAreaView>
  );
}
