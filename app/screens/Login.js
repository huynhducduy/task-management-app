import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";

export default class Login extends React.Component {
    render() {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Input
                        label="Username"
                        leftIcon={{
                            type: "font-awesome",
                            name: "chevron-left",
                        }}
                        errorStyle={{ color: "red" }}
                        errorMessage="ENTER A VALID ERROR HERE"
                    />
                    <Input
                        label="Password"
                        leftIcon={{
                            type: "font-awesome",
                            name: "chevron-left",
                        }}
                        secureTextEntry={true}
                        errorStyle={{ color: "red" }}
                        errorMessage="ENTER A VALID ERROR HERE"
                    />
                    <Button title="Login" />
                </View>
            </>
        );
    }
}
