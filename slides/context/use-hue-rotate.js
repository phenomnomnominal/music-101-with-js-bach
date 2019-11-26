import { useAnimation } from './use-animation';

let degrees = 0;

export function useHueRotation() {
  useAnimation(() => {
    degrees += 0.1;
    document.documentElement.style.setProperty('--hue-rotate', `${degrees}deg`);
  });
}
