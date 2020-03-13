import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            username_error: "",
            email: "",
            email_error: "",
            fullname: "",
            fullname_error: "",
            password: "",
            password_error: "",
        };
    }

    onChangeUsername = function(username) {
        this.setState({ username });
    }.bind(this);

    onChangeEmail = function(email) {
        this.setState({ email });
    }.bind(this);

    onChangeFullname = function(fullname) {
        this.setState({ fullname });
    }.bind(this);

    onChangePassword = function(password) {
        this.setState({ password });
    }.bind(this);

    register = function() {
        this.setState({
            username_error: "Wrong username",
            password_error: "Wrong password",
        });
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
                        label="Email"
                        errorStyle={{ color: "red" }}
                        value={this.state.email}
                        keyboardType="email-address"
                        onChangeText={this.onChangeEmail}
                        labelStyle={{ marginTop: 10 }}
                        errorMessage={this.state.email_error}
                    />
                    <Input
                        label="Full name"
                        errorStyle={{ color: "red" }}
                        value={this.state.fullname}
                        onChangeText={this.onChangeFullname}
                        labelStyle={{ marginTop: 10 }}
                        errorMessage={this.state.fullname_error}
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
                        title="Register"
                        style={{ marginTop: 10 }}
                        onPress={this.register}
                    />
                </View>
            </>
        );
    }
}
