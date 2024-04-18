import { useState } from 'react';
import { useWindowResize } from './use-window-resize';

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useWindowResize(() => setSize([window.innerWidth, window.innerHeight]));

  return size;
};
