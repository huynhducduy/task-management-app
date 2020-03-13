import React from "react";
import { View, Button } from "react-native-elements";

function Walkthrough({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "top" }}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="Get started"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
}
