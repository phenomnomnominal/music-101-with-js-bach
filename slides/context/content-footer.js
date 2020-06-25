import React from 'react';
import styled from 'styled-components';

import { BODY_TYPE, FOOTER } from '../styles.variables';

const Footer = styled.footer`
  font-family: ${BODY_TYPE};
  z-index: ${FOOTER};

  width: 100%;

  position: absolute;
  bottom: 0rem;
  padding: 1rem;
`;

const Location = styled.span`
  float: left;
  font-weight: 700;
  text-decoration: none;
  color: gold;
`;

const Link = styled.a`
  float: right;
  font-weight: 700;
  text-decoration: none;
  color: gold;
`;

export function ContentFooter() {
  return (
    <Footer>
      <Location>
        HolyJS | 2020 |{' '}
        <span role="img" aria-label="Russia">
          🇸🇷🇺
        </span>
      </Location>
      <Link href="https://twitter.com/phenomnominal">@phenomnominal</Link>
    </Footer>
  );
}
