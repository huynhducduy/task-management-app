import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export default function Walkthrough({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "top",
                marginTop: 10,
            }}
        >
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}
