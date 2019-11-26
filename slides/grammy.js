import React from 'react';
import styled from 'styled-components';

import grammy from '../assets/grammy.png';

const GrammyImg = styled.img`
  transform: scale(1.5);
`;
export function Grammy() {
  return <GrammyImg src={grammy}></GrammyImg>;
}
