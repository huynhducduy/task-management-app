import setAccessToken from "./setAccessToken";
import setRefreshToken from "./setRefreshToken";
import setAccessTokenExpiresAt from "./setAccessTokenExpiresAt";

export default async function() {
    try {
        await setAccessToken();
        await setRefreshToken();
        await setAccessTokenExpiresAt();
        return;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
