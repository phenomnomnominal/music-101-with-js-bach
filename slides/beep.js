import React from 'react';

import { useAudio } from './context/use-audio';
import { ButtonContainer, Button } from './components/button';

export function Beep() {
  const { audio, analyser } = useAudio();

  function makeBeep() {
    const beep = audio.createOscillator();
    const gain = audio.createGain();
    gain.gain.value = 0.5;
    beep.connect(gain);
    gain.connect(analyser);
    beep.start(audio.currentTime);
    beep.stop(audio.currentTime + 0.5);
  }

  return (
    <ButtonContainer>
      <Button onClick={() => makeBeep()}>Beep</Button>
    </ButtonContainer>
  );
}
