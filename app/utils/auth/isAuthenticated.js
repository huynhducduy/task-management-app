import getAccessToken from './getAccessToken';
import tokenIsExpired from './tokenIsExpired';

export default async function() {
  try {
    return !!(await getAccessToken()) && !(await tokenIsExpired());
  } catch (error) {
    console.log(error);
    return false;
  }
}
