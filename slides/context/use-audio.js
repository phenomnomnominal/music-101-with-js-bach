import { createContext, useContext } from 'react';

let audio;
let gain;
let analyser;
let analyserData;
if (typeof window !== 'undefined') {
  audio = new window.AudioContext();
  gain = audio.createGain();
  analyser = audio.createAnalyser();
  analyser.fftSize = 4096;
  analyser.connect(gain);
  gain.connect(audio.destination);
  const bufferLength = analyser.frequencyBinCount * 2;
  analyserData = new Float32Array(bufferLength);
}

const Audio = createContext(audio);
const MasterGain = createContext(gain);
const Analyser = createContext(analyser);
const AnalyserData = createContext(analyserData);

export function useAudio() {
  const audio = useContext(Audio);
  const analyser = useContext(Analyser);
  const analyserData = useContext(AnalyserData);
  const gain = useContext(MasterGain);

  return { audio, analyser, analyserData, gain };
}
