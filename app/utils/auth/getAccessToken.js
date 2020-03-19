import * as asyncStorage from "../async-storage";
import constants from "./constants";

export default async function() {
    try {
        return await asyncStorage.getItem(
            constants.ASYNC_STORAGE_KEY.ACCESS_TOKEN
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}
