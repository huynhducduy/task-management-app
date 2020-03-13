import React from "react";
import { StatusBar, View } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, ThemeProvider } from "react-native-elements";

export default function App() {
    return (
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ThemeProvider></ThemeProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
