import React from 'react';
import styled from 'styled-components';

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Group({ children }) {
  return <GroupWrapper>{children}</GroupWrapper>;
}
