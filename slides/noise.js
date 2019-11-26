import { useEffect } from 'react';

import { useAudio } from './context/use-audio';

export function Noise() {
  const { audio, analyser, gain } = useAudio();

  useEffect(() => {
    let lastOut = 0.0;
    const bufferSize = 4096;
    const noise = audio.createScriptProcessor(bufferSize, 1, 1);
    noise.onaudioprocess = e => {
      const output = e.outputBuffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= Math.sin(audio.currentTime / 4) * 2;
      }
    };
    gain.gain.value = 0.5;
    noise.connect(analyser);
    return () => {
      noise.disconnect();
      gain.gain.value = 1;
    };
  }, [audio, analyser, gain]);

  return '';
}
