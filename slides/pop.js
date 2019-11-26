import { useEffect } from 'react';
import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';

export function Pop({ minor = true }) {
  const { audio, analyser } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
    const notes = [
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
    timer.handlers = timer.handlers || [];
    function metronome(bpm, callback) {
      timer.handlers.push(scheduler);
      timer.postMessage('start');

      let nextBeat = audio.currentTime + 1;
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

    return timer && metronome(320, beat);
  }, [audio, analyser, timerRef, minor]);

  useEffect(() => {
    const chords = minor
      ? [
          [440, 523.25, 659.25],
          [349.23, 440, 523.25],
          [261.62 * 2, 329.62 * 2, 391.99 * 2],
          [391.99, 493.88, 587.33]
        ]
      : [
          [261.62, 329.62, 391.99],
          [391.99, 493.88, 587.33],
          [440, 523.25, 659.25],
          [349.23, 440, 523.25]
        ];
    const played = [];

    const timer = timerRef.current;
    timer.handlers = timer.handlers || [];
    function metronome(bpm, callback) {
      timer.handlers.push(scheduler);
      timer.postMessage('start');

      let nextBeat = audio.currentTime + 1;
      let secondsPerBeat = 60.0 / bpm;
      let nextChord = chords.shift();

      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          secondsPerBeat = 60.0 / bpm;
          callback(nextBeat, secondsPerBeat, nextChord);
          nextBeat += secondsPerBeat;
          played.push(nextChord);
          if (chords.length === 0) {
            chords.push.apply(chords, played);
            played.length = 0;
          }
          nextChord = chords.shift();
        }
      }
    }

    function makeTriad(time, secondsPerBeat, nextChord) {
      const [frequency1, frequency2, frequency3] = nextChord;
      const f1 = audio.createOscillator();
      f1.frequency.value = frequency1;
      const f2 = audio.createOscillator();
      f2.frequency.value = frequency2;
      const f3 = audio.createOscillator();
      f3.frequency.value = frequency3;
      const gain = audio.createGain();
      f1.start(time + 0.01);
      f1.stop(time + secondsPerBeat * 1.5);
      f2.start(time + 0.01);
      f2.stop(time + secondsPerBeat * 1.5);
      f3.start(time + 0.01);
      f3.stop(time + secondsPerBeat * 1.5);
      gain.gain.setValueAtTime(0, time);
      gain.gain.exponentialRampToValueAtTime(0.25, time + secondsPerBeat / 2);
      gain.gain.exponentialRampToValueAtTime(0.01, time + secondsPerBeat * 1.5);
      f1.connect(gain);
      f2.connect(gain);
      f3.connect(gain);
      gain.connect(analyser);
    }

    return timer && metronome(320 / 8, makeTriad);
  }, [audio, analyser, timerRef, minor]);

  useEffect(() => {
    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = () => {
        timer.handlers.forEach(h => h());
        scheduler();
      };
      timer.postMessage('start');

      let nextBeat = audio.currentTime + 1;
      let count = 0;
      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          callback(nextBeat, count % 2 === 0 ? 1 : 0.25);
          nextBeat += 60.0 / bpm;
          count = count + 1;
        }
      }
    }

    function beat(time, volume) {
      const osc = audio.createOscillator();
      osc.frequency.setValueAtTime(110 / volume, time);
      osc.frequency.exponentialRampToValueAtTime(20, time + 0.1);
      const gain = audio.createGain();
      gain.gain.exponentialRampToValueAtTime(volume, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      osc.connect(gain);
      gain.connect(analyser);
      osc.start(time);
      osc.stop(time + 0.1);
    }

    return timer && metronome(320 / 2, beat);
  }, [audio, analyser, timerRef]);

  return null;
}
