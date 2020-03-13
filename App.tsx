import React from "react";
import { StatusBar, View } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, ThemeProvider } from "react-native-elements";
import ErrorBoundary from "./app/components/errorBoundary";

export default function App() {
    return (
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <ThemeProvider>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView></SafeAreaView>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
