import { useEffect, useRef } from 'react';

export function useWorker(func) {
  const worker = useRef(null);
  useEffect(() => {
    const blob = new Blob([
      `
(${func}).call(self);
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
