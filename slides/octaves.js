import React from 'react';

import { useAudio } from './context/use-audio';
import { ButtonContainer, Button } from './components/button';

export function Octaves() {
  const { audio, analyser } = useAudio();

  function makeBeep(frequency) {
    const beep = audio.createOscillator();
    const gain = audio.createGain();
    beep.frequency.value = frequency;
    beep.start(audio.currentTime + 0.1);
    beep.stop(audio.currentTime + 1.1);
    gain.gain.setValueAtTime(0, audio.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 1.1);
    beep.connect(gain);
    gain.connect(analyser);
  }

  return (
    <ButtonContainer>
      <Button onClick={() => makeBeep(55)}>A1 (55Hz)</Button>
      <Button onClick={() => makeBeep(110)}>A2 (110Hz)</Button>
      <Button onClick={() => makeBeep(220)}>A3 (220Hz)</Button>
      <Button onClick={() => makeBeep(440)}>A4 (440Hz)</Button>
      <Button onClick={() => makeBeep(880)}>A5 (880Hz)</Button>
    </ButtonContainer>
  );
}
