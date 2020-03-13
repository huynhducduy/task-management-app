import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage } from "react-native";

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
                    justifyContent: "top",
                    alignItems: "center",
                }}
            >
                <Text>Task</Text>
            </View>
        );
    }
}
