import { useState } from 'react';
import { createContainer } from 'unstated-next';

export default createContainer((initialState = false) => {
  const [isLoading, setLoading] = useState(initialState);
  return { isLoading, setLoading };
});
