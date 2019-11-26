import { useWorker } from './use-worker';

export function useTimer() {
  return useWorker(timer);
}

function timer() {
  const INTERVAL = 25;

  let timerID = null;
  this.onmessage = e => {
    if (e.data === 'start') {
      timerID = setInterval(() => this.postMessage('tick'), INTERVAL);
    } else if (e.data === 'stop') {
      clearInterval(timerID);
      timerID = null;
    }
  };
}
