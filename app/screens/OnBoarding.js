import React from "react";
import { Input, Button } from "react-native-elements";

export default class Login extends React.Component {
    render() {
        return (
            <>
                <Input
                    placeholder="Username"
                    leftIcon={{
                        type: "font-awesome",
                        name: "chevron-left",
                    }}
                    errorStyle={{ color: "red" }}
                    errorMessage="ENTER A VALID ERROR HERE"
                />
                <Input
                    placeholder="Password"
                    leftIcon={{
                        type: "font-awesome",
                        name: "chevron-left",
                    }}
                    secureTextEntry={true}
                    errorStyle={{ color: "red" }}
                    errorMessage="ENTER A VALID ERROR HERE"
                />
                <Button title="Login" />
            </>
        );
    }
}
