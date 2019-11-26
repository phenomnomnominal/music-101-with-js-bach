import { useEffect, useRef } from 'react';

export function useWorker(func) {
  const worker = useRef(null);
  useEffect(() => {
    const blob = new Blob([
      `
(${func})(self);
    `
    ]);
    const w = new Worker(URL.createObjectURL(blob));
    worker.current = w;
    return () => {
      w.terminate();
    };
  }, [func, worker]);
  return worker;
}
