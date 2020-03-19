import constants from "./constants";
import tokenIsExpired from "./tokenIsExpired";
import getAccessToken from "./getAccessToken";

export default async function() {
    try {
        return !!(await getAccessToken()) && !(await tokenIsExpired());
    } catch (error) {
        console.error(error);
        return false;
    }
}
