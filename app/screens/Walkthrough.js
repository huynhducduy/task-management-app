import { Button, Icon, Layout } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';

export default function Walkthrough({ navigation }) {
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        paddingTop: 10,
      }}
    >
      <Button
        icon={style => <Icon name="login-variant" {...style} />}
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
    </Layout>
  );
}

Walkthrough.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
