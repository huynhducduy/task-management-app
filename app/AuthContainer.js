import { useState } from 'react';
import { createContainer } from 'unstated-next';

export default createContainer((initialState = false) => {
  const [isLoggedIn, setLoggedIn] = useState(initialState);
  return { isLoggedIn, setLoggedIn };
});
