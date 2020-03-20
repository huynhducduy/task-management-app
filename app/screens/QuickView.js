import React from 'react';
import { Text, View } from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
        }}
      >
        <Text>Quick View</Text>
      </View>
    );
  }
}
