import { AsyncStorage } from 'react-native';

import generateKey from './generateKey';

export default async (key, defaultValue = null, callback = function() {}) => {
  try {
    let value;
    if (Array.isArray(key)) {
      value = await AsyncStorage.multiGet(
        key.map(k => generateKey(k)),
        callback
      );
    } else value = await AsyncStorage.getItem(generateKey(key), callback);
    return value !== null ? value : defaultValue;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
