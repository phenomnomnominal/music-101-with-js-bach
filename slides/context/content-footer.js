import React from 'react';
import styled from 'styled-components';

import { BODY_TYPE, FOOTER } from '../styles.variables';

const Footer = styled.footer`
  font-family: ${BODY_TYPE};
  /* background: rgba(0, 0, 0, 0.75); */
  /* box-shadow: 0px -2px 2px gold; */
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
        Front End Connect | 2019 |{' '}
        <span role="img" aria-label="Poland">
          🇵🇱
        </span>
      </Location>
      <Link href="https://twitter.com/phenomnominal">@phenomnominal</Link>
    </Footer>
  );
}
