import { getState } from '../state';
import { useWindowWidth } from './use-window-width';
import { useAudio } from './use-audio';
import { useAnimation } from './use-animation';

export function useWaveform() {
  const [width, height] = useWindowWidth();

  const { analyser, analyserData } = useAudio();
  useAnimation(() => {
    const { canvas, draw } = getState();
    if (canvas) {
      analyser.getFloatTimeDomainData(analyserData);
      drawWaveForm(draw, canvas, width, height, analyserData);
    }
  });
}

function drawWaveForm(draw, canvas, width, height, data) {
  canvas.fillStyle = 'transparent';
  canvas.clearRect(0, 0, width, height);
  if (draw) {
    canvas.lineWidth = 4;
    canvas.strokeStyle = 'black';
    canvas.lineCap = 'round';
    canvas.beginPath();
    for (let i = 0; i < data.length; i += 1) {
      const x = i * (width / data.length);
      const y = (0.5 + data[i] / 2) * height;
      if (i === 0) {
        canvas.moveTo(x, y);
      } else {
        canvas.lineTo(x, y);
      }
    }
    canvas.stroke();
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'gold';
    canvas.beginPath();
    for (let i = 0; i < data.length; i += 1) {
      const x = i * (width / data.length);
      const y = (0.5 + data[i] / 2) * height;
      if (i === 0) {
        canvas.moveTo(x, y);
      } else {
        canvas.lineTo(x, y);
      }
    }
    canvas.stroke();
  }
}
