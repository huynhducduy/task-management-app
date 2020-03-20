import * as asyncStorage from '../async-storage';
import constants from './constants';

/**
 * @return int
 */
export default async function() {
  try {
    const accessTokenExpireAt = parseInt(
      await asyncStorage.getItem(
        constants.ASYNC_STORAGE_KEY.ACCESS_TOKEN_EXPIRES_AT,
        0
      ),
      10
    );

    return Number.isInteger(accessTokenExpireAt) && accessTokenExpireAt >= 0
      ? accessTokenExpireAt
      : 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
