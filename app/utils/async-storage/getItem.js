import { AsyncStorage } from "react-native";
import generateKey from "./generateKey";

export default async (key, defaultValue = "", callback = function() {}) => {
    try {
        let value;
        if (Array.isArray(key)) {
            value = await AsyncStorage.multiGet(
                key.map(k => generateKey(k)),
                callback
            );
            defaultValue = [];
        } else value = await AsyncStorage.getItem(generateKey(key), callback);
        return value !== null ? value : defaultValue;
    } catch (error) {
        throw error;
    }
};
