import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Walkthrough from "./screens/Walkthrough";
import AuthContainer from "./AuthContainer";

const Stack = createStackNavigator();

export default function() {
    const auth = AuthContainer.useContainer();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!auth.isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="Walkthrough"
                            component={Walkthrough}
                            options={{ title: "Walkthrough" }}
                        />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                ) : (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: "Sen Task Management" }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
