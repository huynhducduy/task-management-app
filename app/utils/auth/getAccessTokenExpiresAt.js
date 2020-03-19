import * as asyncStorage from "../async-storage";
import constants from "./constants";

/**
 * @return int
 */
export default async function() {
    try {
        const access_token_expire_at = parseInt(
            await asyncStorage.getItem(
                constants.ASYNC_STORAGE_KEY.ACCESS_TOKEN_EXPIRES_AT,
                0
            )
        );

        return Number.isInteger(access_token_expire_at) &&
            access_token_expire_at >= 0
            ? access_token_expire_at
            : 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
