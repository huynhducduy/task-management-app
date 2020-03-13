import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { AsyncStorage, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

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

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: item.avatar_url } }}
            bottomDivider
            chevron
        />
    );

    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.list}
                renderItem={this.renderItem}
            />
        );
    }
}
