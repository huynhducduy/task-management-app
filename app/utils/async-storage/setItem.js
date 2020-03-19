import { AsyncStorage } from "react-native";
import generateKey from "./generateKey";

export default async (key, value, callback = function() {}) => {
    try {
        if (Array.isArray(key) && Array.isArray(value))
            await AsyncStorage.multiSet(
                key.map(k => generateKey(k)),
                value,
                callback
            );
        else await AsyncStorage.setItem(generateKey(key), value, callback);
        return;
    } catch (error) {
        throw error;
    }
};
