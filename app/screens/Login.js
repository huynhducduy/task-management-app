import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage } from "react-native";
import AuthContainer from "../AuthContainer";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [username_error, setUsernameError] = useState();
    const [password_error, setPasswordError] = useState();

    const login = function() {
        auth.setLoggedIn(true);
    };

    const auth = AuthContainer.useContainer();

    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "top",
                    alignItems: "center",
                }}
            >
                <Input
                    label="Username"
                    errorStyle={{ color: "red" }}
                    value={username}
                    onChangeText={setUsername}
                    labelStyle={{ marginTop: 10 }}
                    errorMessage={username_error}
                />
                <Input
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={this.setPassword}
                    value={password}
                    errorStyle={{ color: "red" }}
                    labelStyle={{ marginTop: 10 }}
                    errorMessage={password_error}
                />
                <Button
                    title="Login"
                    style={{ marginTop: 10 }}
                    onPress={login}
                />
            </View>
        </>
    );
}
