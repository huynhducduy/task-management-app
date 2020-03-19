import { toDate, differenceInHours } from "date-fns";
import getAccessTokenExpiresAt from "./getAccessTokenExpiresAt";

export default async function() {
    try {
        return differenceInHours(
            toDate((await getAccessTokenExpiresAt()) * 1000),
            new Date()
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}
