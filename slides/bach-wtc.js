import React from 'react';
import styled from 'styled-components';

import { FRAME } from './styles.variables';

import bach from '../assets/bach-2.jpeg';
import frame from '../assets/frame.png';

const BachWrapper = styled.div`
  position: relative;
  height: 60vh;
  width: 45vh;
  margin-top: -20vh;
`;

const BachFrame = styled.img`
  position: absolute;
  z-index: ${FRAME};
`;

const BachPortrait = styled.img`
  position: relative;
  margin: auto;
  width: 80%;
  padding: 20% 0;
`;

export function BachWTC() {
  return (
    <BachWrapper>
      <BachFrame src={frame}></BachFrame>
      <BachPortrait src={bach}></BachPortrait>
    </BachWrapper>
  );
}
