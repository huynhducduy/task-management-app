import setAccessToken from './setAccessToken';
import setAccessTokenExpiresAt from './setAccessTokenExpiresAt';
import setRefreshToken from './setRefreshToken';

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
