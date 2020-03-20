import { isEmpty } from 'ramda';

import removeItem from '../async-storage/removeItem';
import setItem from '../async-storage/setItem';
import constants from './constants';

export default async function(token = '') {
  try {
    if (isEmpty(token))
      await removeItem(constants.ASYNC_STORAGE_KEY.REFRESH_TOKEN);
    else await setItem(constants.ASYNC_STORAGE_KEY.REFRESH_TOKEN, token);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
