import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage } from "react-native";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            username_error: "",
            password: "",
            password_error: "",
        };
    }

    onChangeUsername = function(username) {
        this.setState({ username });
    }.bind(this);

    onChangePassword = function(password) {
        this.setState({ password });
    }.bind(this);

    login = function() {
        this.props.setLoggedIn(true);
        // this.setState({
        //     username_error: "Wrong username",
        //     password_error: "Wrong password",
        // });
    }.bind(this);

    render() {
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
                        value={this.state.username}
                        onChangeText={this.onChangeUsername}
                        labelStyle={{ marginTop: 10 }}
                        errorMessage={this.state.username_error}
                    />
                    <Input
                        label="Password"
                        secureTextEntry={true}
                        onChangeText={this.onChangePassword}
                        value={this.state.password}
                        errorStyle={{ color: "red" }}
                        labelStyle={{ marginTop: 10 }}
                        errorMessage={this.state.password_error}
                    />
                    <Button
                        title="Login"
                        style={{ marginTop: 10 }}
                        onPress={this.login}
                    />
                </View>
            </>
        );
    }
}
