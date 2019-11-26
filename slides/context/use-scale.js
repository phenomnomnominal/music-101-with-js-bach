import { useEffect, useState } from 'react';
import { useTimer } from './use-timer';
import { useAudio } from './use-audio';

export function useScale(notes) {
  const [play, setPlay] = useState(false);
  const { audio, analyser } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
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
          nextBeat += secondsPerBeat;
          if (play) {
            callback(nextBeat, secondsPerBeat, nextNote);
            played.push(nextNote);
            if (notes.length === 0) {
              notes.push.apply(notes, played);
              played.length = 0;
              setPlay(false);
            }
            nextNote = notes.shift();
          }
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

    return timer && metronome(120, beat);
  }, [play, notes, audio, analyser, timerRef]);

  return () => {
    setPlay(!play);
  };
}
