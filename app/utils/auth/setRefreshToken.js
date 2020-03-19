import { isEmpty } from "ramda";
import constants from "./constants";

import setItem from "../async-storage/setItem";
import removeItem from "../async-storage/removeItem";

export default async function(token = "") {
    try {
        if (isEmpty(token))
            await removeItem(constants.ASYNC_STORAGE_KEY.REFRESH_TOKEN);
        else await setItem(constants.ASYNC_STORAGE_KEY.REFRESH_TOKEN, token);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
