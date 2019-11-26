import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  margin: auto;
`;

export function ContentWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
