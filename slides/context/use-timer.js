import { useWorker } from './use-worker';

export function useTimer() {
  return useWorker(timer);
}

function timer(ctx) {
  const INTERVAL = 25;

  let timerID = null;
  ctx.onmessage = e => {
    if (e.data === 'start') {
      timerID = setInterval(() => ctx.postMessage('tick'), INTERVAL);
    } else if (e.data === 'stop') {
      clearInterval(timerID);
      timerID = null;
    }
  };
}
