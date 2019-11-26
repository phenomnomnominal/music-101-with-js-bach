import React, { useEffect } from 'react';

import { useAudio } from './context/use-audio';
import { Button, ButtonContainer } from './components/button';

export function MicrophoneAudio() {
  const { audio, analyser, gain } = useAudio();

  useEffect(() => {
    async function getUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mic = audio.createMediaStreamSource(stream);
      gain.gain.value = 0;
      mic.connect(analyser);
      return mic;
    }
    const get = getUserMedia();
    return async () => {
      const mic = await get;
      mic.disconnect();
      gain.gain.value = 1;
    };
  }, [audio, analyser, gain]);

  return (
    <ButtonContainer>
      <Button
        onClick={() => {
          audio.resume();
        }}
        aria-label="Play"
      >
        PLAY
      </Button>
    </ButtonContainer>
  );
}
