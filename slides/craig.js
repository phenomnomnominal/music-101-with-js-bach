import React from 'react';
import styled from 'styled-components';

import { FRAME } from './styles.variables';

import craig from '../assets/craig.jpeg';
import frame from '../assets/frame.png';

const CraigWrapper = styled.div`
  position: relative;
  height: 60vh;
  width: 45vh;
  margin-top: -20vh;
`;

const CraigFrame = styled.img`
  position: absolute;
  z-index: ${FRAME};
`;

const CraigPortrait = styled.img`
  position: relative;
  margin: auto;
  width: 80%;
  padding: 20% 0;
`;

export function Craig() {
  return (
    <CraigWrapper>
      <CraigFrame src={frame}></CraigFrame>
      <CraigPortrait src={craig}></CraigPortrait>
    </CraigWrapper>
  );
}
