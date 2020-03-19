import { AsyncStorage } from "react-native";
import generateKey from "./generateKey";

export default async (key, value, callback = function() {}) => {
    try {
        if (Array.isArray(key) && Array.isArray(value)) {
            let data = [];
            key = [...key.map(k => generateKey(k)), ...value];
            while (key.length) data.push(key.splice(0, 2));
            await AsyncStorage.multiSet(data, callback);
        } else await AsyncStorage.setItem(generateKey(key), value, callback);
        return;
    } catch (error) {
        throw error;
    }
};
