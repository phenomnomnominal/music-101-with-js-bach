import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAudio } from './context/use-audio';
import { useTimer } from './context/use-timer';

const RhythmWrapper = styled.div`
  transform: translateY(-25vh);
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  color: gold;
  border-radius: 50%;
  line-height: 4rem;
  font-size: 2rem;
  text-align: center;
`;

export function Rhythm() {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(2);
  const { audio, analyser, gain } = useAudio();
  const timerRef = useTimer();

  useEffect(() => {
    const timer = timerRef.current;
    function metronome(bpm, callback) {
      timer.onmessage = scheduler;
      timer.postMessage('start');

      let nextBeat = audio.currentTime;
      let count = 0;
      function scheduler() {
        while (nextBeat < audio.currentTime + 0.1) {
          callback(nextBeat, count % beatsPerMeasure === 0 ? 0.5 : 0.05);
          nextBeat += 60.0 / bpm;
          count = count + 1;
        }
      }
    }

    function beat(time, volume) {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      gain.gain.exponentialRampToValueAtTime(volume, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      osc.connect(gain);
      gain.connect(analyser);
      osc.start(time);
      osc.stop(time + 0.1);
    }

    return timer && metronome(180, beat);
  }, [audio, analyser, gain, timerRef, beatsPerMeasure]);

  return (
    <RhythmWrapper>
      <Input
        type="number"
        value={beatsPerMeasure}
        min={1}
        max={6}
        onChange={e => setBeatsPerMeasure(e.target.value)}
      />
      <label>beats</label>
    </RhythmWrapper>
  );
}
