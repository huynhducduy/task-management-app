import { toDate, compareAsc } from "date-fns";
import getAccessTokenExpiresAt from "./getAccessTokenExpiresAt";

/**
 * @return bool
 */
export default async function() {
    // return expireAt < now
    try {
        return (
            compareAsc(
                toDate((await getAccessTokenExpiresAt()) * 1000),
                new Date()
            ) !== 1
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}
