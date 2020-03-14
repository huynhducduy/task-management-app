import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    ListGroup = function() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.list}
                renderItem={this.renderItem}
            />
        );
    }.bind(this);

    list = [
        {
            name: "Front-End Team",
            avatar_url:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            subtitle: "Me, myself, I, and 0 others",
        },
        {
            name: "Back-End Team",
            avatar_url:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            subtitle: "She, he, you, and n others",
        },
    ];

    onPress = function() {
        this;
    }.bind(this);

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: item.avatar_url } }}
            onPress={this.onPress}
            bottomDivider
            chevron
        />
    );

    render() {
        return (
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="ListGroup" component={this.ListGroup} />
                <Stack.Screen name="ViewGroup" component={this.ListGroup} />
            </Stack.Navigator>
        );
    }
}
