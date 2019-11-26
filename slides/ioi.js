import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';
import { Button } from './components/button';

const IOIWrapper = styled.div`
  text-align: center;
  transform: translateY(-25vh);
`;

export function IOI() {
  const [beatsPerMinute, setBeatsPerMinute] = useState(60);
  const { audio, analyser, gain } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = scheduler;
      timer.postMessage('start');

      let nextBeat = audio.currentTime;
      let secondsPerBeat = 60.0 / bpm;
      let count = 0;
      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          secondsPerBeat = 60.0 / bpm;
          callback(nextBeat, secondsPerBeat);
          nextBeat += secondsPerBeat;
          count = count + 1;
        }
      }
    }

    function beat(time, length) {
      const osc = audio.createOscillator();
      const oscGain = audio.createGain();
      oscGain.gain.exponentialRampToValueAtTime(0.15, time + length / 4);
      oscGain.gain.exponentialRampToValueAtTime(0.01, time + length / 2);
      osc.connect(oscGain);
      oscGain.connect(analyser);
      osc.start(time);
      osc.stop(time + length / 2);
    }

    return timer && metronome(beatsPerMinute, beat);
  }, [audio, analyser, gain, timerRef, beatsPerMinute]);

  return (
    <IOIWrapper>
      <label>{beatsPerMinute} bpm</label>
      <br />
      <label>{beatsPerMinute / 60} Hz</label>
      <br />
      <label>{1000 / (beatsPerMinute / 60)} ms</label>
      <br />
      <Button onClick={e => setBeatsPerMinute(beatsPerMinute * 2)}>
        Faster
      </Button>
      <Button onClick={e => setBeatsPerMinute(beatsPerMinute / 2)}>
        Slower
      </Button>
    </IOIWrapper>
  );
}
