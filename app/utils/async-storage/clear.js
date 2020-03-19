import { AsyncStorage } from "react-native";

export default async () => {
    try {
        await AsyncStorage.clear();
        return;
    } catch (error) {
        throw error;
    }
};
