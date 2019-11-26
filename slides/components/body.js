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

const Character = styled.span``;

export function Body({ text }) {
  return (
    <BodyWrapper>
      {text.split('').map((c, i) => (
        <Character key={`${text}_${c}_${i}`}>{c}</Character>
      ))}
    </BodyWrapper>
  );
}
