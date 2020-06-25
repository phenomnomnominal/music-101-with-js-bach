import React from 'react';
import styled from 'styled-components';

const Character = styled.span`
  opacity: 1;
  animation-timing-function: ease-in;
  animation: appear 1s;
  animation-iteration-count: 1;
`;

const Header0Wrapper = styled.h1`
  display: inline-flex;
  font-family: 'Ruthie';
  text-shadow: 0px 0px 50px white;
  margin: 6rem 0;
  line-height: 16rem;
  font-size: 16rem;
  color: white;
  padding-bottom: 4rem;
`;

export function H0({ text }) {
  return (
    <Header0Wrapper>
      {text.split('').map((c, i) => (
        <Character key={`${text}_${c}_${i}`}>
          {c === ' ' ? <span className="whitespace"></span> : c}
        </Character>
      ))}
    </Header0Wrapper>
  );
}

const Header1Wrapper = styled.h1`
  display: inline-flex;
  font-family: 'Ruthie';
  text-shadow: -2px -2px 0px white;
  margin: 3rem 0;
  line-height: 10rem;
  font-size: 10rem;
  color: gold;
  padding-bottom: 2rem;
`;

const H1Character = styled.span``;

export function H1({ text }) {
  return (
    <Header1Wrapper>
      {text.split('').map((c, i) => (
        <H1Character key={`${text}_${c}_${i}`}>
          {c === ' ' ? <span className="whitespace"></span> : c}
        </H1Character>
      ))}
    </Header1Wrapper>
  );
}

export const Header2Wrapper = styled.h2`
  display: inline-flex;
  font-family: 'Ruthie';
  text-shadow: -2px -2px 50px black;
  margin: 2rem 0;
  line-height: 6rem;
  font-size: 6rem;
  color: gold;
`;

const H2Character = styled.span``;

export function H2({ text }) {
  return (
    <Header2Wrapper>
      {text.split('').map((c, i) => (
        <H2Character key={`${text}_${c}_${i}`}>
          {c === ' ' ? <span className="whitespace"></span> : c}
        </H2Character>
      ))}
    </Header2Wrapper>
  );
}
