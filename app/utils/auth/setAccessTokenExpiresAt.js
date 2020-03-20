import { isEmpty } from 'ramda';

import removeItem from '../async-storage/removeItem';
import setItem from '../async-storage/setItem';
import constants from './constants';

export default async function(expires_at = '') {
  try {
    if (isEmpty(expires_at))
      await removeItem(constants.ASYNC_STORAGE_KEY.ACCESS_TOKEN_EXPIRES_AT);
    else {
      await setItem(
        constants.ASYNC_STORAGE_KEY.ACCESS_TOKEN_EXPIRES_AT,
        expires_at
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
