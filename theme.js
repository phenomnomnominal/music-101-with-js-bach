import { nightOwl } from '@code-surfer/themes';

import { Provider } from './slides/context/provider';

// Make sure `window` is defined for VexFlow:
if (typeof window === 'undefined') {
  global.window = {};
}

export const theme = {
  colors: {
    primary: 'gold',
    background: 'transparent',
    zoom: 'transparent',
    text: 'white'
  },
  fonts: {
    body: 'Literata',
    monospace: 'Fira Mono'
  },
  styles: {
    CodeSurfer: nightOwl.styles.CodeSurfer
  },
  fontSizes: [11, 12, 14, 16, 20, 24, 32, 48],
  Provider
};
