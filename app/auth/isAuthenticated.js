import { AsyncStorage } from "react-native";

export default async function isAuthenticated() {
    try {
        const value = await AsyncStorage.getItem("access_token");
        if (value !== null) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
