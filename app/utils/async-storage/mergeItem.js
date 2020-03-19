import { AsyncStorage } from "react-native";
import generateKey from "./generateKey";

export default async (key, value, callback = function() {}) => {
    try {
        if (Array.isArray(key))
            await AsyncStorage.multiMerge(
                key.map(k => generateKey(k)),
                value.map(k => k + ""),
                callback
            );
        else
            await AsyncStorage.mergeItem(
                generateKey(key),
                value + "",
                callback
            );
        return;
    } catch (error) {
        throw error;
    }
};
