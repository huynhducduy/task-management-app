import { AsyncStorage } from 'react-native';

import generateKey from './generateKey';

export default async (key, callback = function() {}) => {
  try {
    if (Array.isArray(key))
      await AsyncStorage.removeItem(
        key.map(k => generateKey(k)),
        callback
      );
    else await AsyncStorage.removeItem(generateKey(key), callback);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
