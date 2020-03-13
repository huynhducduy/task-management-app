import React from "react";
import "react-native-gesture-handler";
import { StatusBar, View } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ErrorBoundary from "./app/components/errorBoundary";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/Login";

export default function App() {
    return (
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <ThemeProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <ErrorBoundary>
                        <SafeAreaView>
                            <Login />
                        </SafeAreaView>
                    </ErrorBoundary>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
