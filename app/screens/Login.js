import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native';

import AuthContainer from '../AuthContainer';
import DismissKeyboard from '../components/disableKeyboard';
import { LOGIN } from '../endpoints';
import * as apiCaller from '../utils/api_caller';
import { setAccessToken, setAccessTokenExpiresAt } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameStatus, setUsernameStatus] = useState('basic');
  const [usernameError, setUsernameError] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('basic');
  const [passwordError, setPasswordError] = useState('');

  const auth = AuthContainer.useContainer();
  let refPassword;
  let refUsername;

  const login = function() {
    setUsernameStatus();
    setUsernameError();
    setPasswordStatus();
    setPasswordError();

    if (!username || username.length < 4) {
      setUsernameStatus('danger');
      setUsernameError('Username must contains at least 4 chars');
      refUsername.focus();
    } else if (!password || password.length < 6) {
      setPasswordStatus('danger');
      setPasswordError('Password must contains at least 6 chars');
      refPassword.focus();
    } else {
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
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <DismissKeyboard>
          <Layout
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 216,
              backgroundColor: 'rgb(51, 102, 255)',
            }}
          >
            <Text category="h1" status="control">
              Welcome
            </Text>
            <Text category="s1" status="control">
              Sign in to your account
            </Text>
          </Layout>
        </DismissKeyboard>
        <DismissKeyboard>
          <Layout
            style={{
              flex: 1,
              justifyContent: 'top',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
          >
            <Input
              label="Username"
              status={usernameStatus}
              caption={usernameError}
              errorStyle={{ color: 'red' }}
              value={username}
              onChangeText={setUsername}
              labelStyle={{ marginTop: 10 }}
              keyboardType="default"
              autoCapitalize="none"
              icon={style => <Icon {...style} name="account" />}
              ref={input => {
                refUsername = input;
              }}
            />

            <Input
              status={passwordStatus}
              caption={passwordError}
              label="Password"
              onChangeText={setPassword}
              icon={style => <Icon {...style} name="key" />}
              secureTextEntry
              value={password}
              errorStyle={{ color: 'red' }}
              labelStyle={{ marginTop: 10 }}
              autoCapitalize="none"
              ref={input => {
                refPassword = input;
              }}
            />
          </Layout>
        </DismissKeyboard>
        <Layout style={{ padding: 20 }}>
          <Button
            style={{ width: '100%' }}
            onPress={login}
            icon={style => <Icon {...style} name="login" />}
          >
            LOGIN
          </Button>
        </Layout>
      </KeyboardAvoidingView>
      <Layout style={{ alignItems: 'center', paddingBottom: 30 }}>
        <Text appearance="hint">
          Sorry, you cannot create account on your own
        </Text>
      </Layout>
    </>
  );
}
