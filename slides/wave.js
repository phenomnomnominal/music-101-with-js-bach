import { useEffect } from 'react';

import { useAudio } from './context/use-audio';

export function Wave() {
  const { audio, analyser, gain } = useAudio();

  useEffect(() => {
    const wave = audio.createOscillator();
    const waveGain = audio.createGain();
    wave.connect(waveGain);
    waveGain.connect(analyser);
    wave.frequency.value = 1;
    waveGain.gain.value = 0.25;
    wave.start();
    return () => {
      wave.stop();
      wave.disconnect();
      gain.gain.value = 1;
    };
  }, [audio, analyser, gain]);

  return '';
}
