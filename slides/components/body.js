import React from 'react';
import styled from 'styled-components';

const BodyWrapper = styled.h3`
  display: inline-flex;
  text-decoration: none;
  text-shadow: -2px -2px 0px gold;
  color: white;
  margin: 0;
  text-align: center;
`;

export function Body({ text }) {
  return <BodyWrapper>{text}</BodyWrapper>;
}
