import { AsyncStorage } from "react-native";

export default async () => {
    try {
        return AsyncStorage.getAllKeys();
    } catch (error) {
        throw error;
    }
};
