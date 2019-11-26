import { useEffect } from 'react';
import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';

export function Metronome() {
  const { audio, analyser } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = scheduler;
      timer.postMessage('start');

      let nextBeat = audio.currentTime;

      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          callback(nextBeat);
          nextBeat += 60.0 / bpm;
        }
      }
    }

    function beat(time) {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.exponentialRampToValueAtTime(0.5, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      osc.connect(gain);
      gain.connect(analyser);
      osc.start(time);
      osc.stop(time + 0.1);
    }

    return timer && metronome(120, beat);
  }, [audio, analyser, timerRef]);

  return null;
}
