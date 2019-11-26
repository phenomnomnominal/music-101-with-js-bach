import React, { useEffect } from 'react';
import styled from 'styled-components';

import { ContentWallpaper } from './content-wallpaper';
import { ContentWrapper } from './content-wrapper';
import { ContentDrawing } from './content-drawing';
import { ContentFooter } from './content-footer';

import { useHueRotation } from './use-hue-rotate';
import { useWaveform } from './use-waveform';

import './styles.css';

const Content = styled.main`
  position: relative;
  z-index: 3000;
`;

export function Provider({ children }) {
  useEffect(() => {
    function keydown(e) {
      const index = parseFloat(e.key) - 1;
      const button = document.querySelectorAll('button')[index];
      if (button) {
        button.click();
      }
    }
    document.body.addEventListener('keydown', keydown);
    return () => {
      document.body.removeEventListener('keydown', keydown);
    };
  });

  useWaveform();
  useHueRotation();

  return (
    <ContentWrapper>
      <ContentWallpaper></ContentWallpaper>
      <ContentDrawing></ContentDrawing>
      <Content>{children}</Content>
      <ContentFooter></ContentFooter>
    </ContentWrapper>
  );
}
