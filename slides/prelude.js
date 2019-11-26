import { useEffect } from 'react';
import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';

export function Prelude({ minor = false }) {
  const { audio, analyser } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
    const notes = minor
      ? [
          261.6256,
          311.127,
          391.9954,
          523.2511,
          622.254,
          391.9954,
          523.2511,
          622.254
        ]
      : [
          261.6256,
          329.6276,
          391.9954,
          523.2511,
          659.2551,
          391.9954,
          523.2511,
          659.2551
        ];
    const played = [];

    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = scheduler;
      timer.postMessage('start');

      let nextBeat = audio.currentTime;
      let secondsPerBeat = 60.0 / bpm;
      let nextNote = notes.shift();

      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          secondsPerBeat = 60.0 / bpm;
          callback(nextBeat, secondsPerBeat, nextNote);
          nextBeat += secondsPerBeat;
          played.push(nextNote);
          if (notes.length === 0) {
            notes.push.apply(notes, played);
            played.length = 0;
          }
          nextNote = notes.shift();
        }
      }
    }

    function beat(time, secondsPerBeat, note) {
      const osc = audio.createOscillator();
      osc.frequency.value = note;
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + secondsPerBeat);
      osc.connect(gain);
      gain.connect(analyser);
      osc.start(time);
      osc.stop(time + secondsPerBeat * 2);
    }

    return timer && metronome(180, beat);
  }, [audio, analyser, timerRef, minor]);

  return null;
}
