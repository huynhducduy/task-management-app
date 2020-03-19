import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage } from "react-native";
import AuthContainer from "../AuthContainer";

export default function Profile() {
    const auth = AuthContainer.useContainer();
    const logout = function() {
        auth.setLoggedIn(false);
    };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "top",
                alignItems: "center",
            }}
        >
            <Text>Profile</Text>
            <Button onPress={logout} title="Logout" />
        </View>
    );
}
