import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import AuthContainer from '../AuthContainer';
import { LOGIN } from '../endpoints';
import * as apiCaller from '../utils/api_caller';
import { setAccessToken, setAccessTokenExpiresAt } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const auth = AuthContainer.useContainer();

  const login = function() {
    apiCaller
      .Post({
        to: LOGIN,
        data: {
          username,
          password,
        },
      })
      .then(async function loginSuccess(res) {
        try {
          await setAccessToken(res.data.token);
          await setAccessTokenExpiresAt(res.data.expires_at);
          auth.setLoggedIn(true);
        } catch (err) {
          console.log(err);
        }
      })
      .catch(function loginError(error) {
        Alert.alert('Login Failed', 'Credentials is incorrect!', {
          cancelable: true,
        });
        console.log(error.response);
      });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
        }}
      >
        <Input
          label="Username"
          errorStyle={{ color: 'red' }}
          value={username}
          onChangeText={setUsername}
          labelStyle={{ marginTop: 10 }}
        />
        <Input
          label="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          errorStyle={{ color: 'red' }}
          labelStyle={{ marginTop: 10 }}
        />
        <Button title="Login" style={{ marginTop: 10 }} onPress={login} />
      </View>
    </>
  );
}
