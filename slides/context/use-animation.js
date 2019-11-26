import { useEffect, useRef } from 'react';

export function useAnimation(callback) {
  const requestRef = useRef();

  function animate() {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });
}
