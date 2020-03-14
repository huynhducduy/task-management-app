import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";

import { StatusBar, View, Text, Button } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Home from "./app/screens/Home";
import Walkthrough from "./app/screens/Walkthrough";

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const NewLogin = function() {
        return <Login setLoggedIn={setLoggedIn} />;
    };

    return (
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <ThemeProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <Stack.Navigator>
                        {!isLoggedIn ? (
                            <>
                                <Stack.Screen
                                    name="Walkthrough"
                                    component={Walkthrough}
                                    options={{ title: "Walkthrough" }}
                                />
                                <Stack.Screen
                                    name="Login"
                                    component={NewLogin}
                                />
                                <Stack.Screen
                                    name="Register"
                                    component={Register}
                                />
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
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
