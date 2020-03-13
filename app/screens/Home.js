import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Group from "./Group";
import Task from "./Task";
import QuickView from "./QuickView";
import Profile from "./Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = "ios-information-circle";

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Group" component={Group} />
            <Tab.Screen name="Task" component={Task} />
            <Tab.Screen name="Quick View" component={QuickView} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
