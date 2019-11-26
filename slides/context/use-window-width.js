import { useEffect, useState } from 'react';

const RESIZE = 'resize';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener(RESIZE, resizeHandler);
    return () => {
      window.removeEventListener(RESIZE, resizeHandler);
    };
  });
  const resizeHandler = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };
  return [windowWidth, windowHeight];
}
