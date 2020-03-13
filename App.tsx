import React from "react";
import "react-native-gesture-handler";
import { StatusBar, View, Text, Button } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ErrorBoundary from "./app/components/errorBoundary";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/screens/Login";

function HomeScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <ThemeProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <ErrorBoundary>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{ title: "Overview" }}
                            />
                            <Stack.Screen name="Login" component={Login} />
                        </Stack.Navigator>
                    </ErrorBoundary>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
