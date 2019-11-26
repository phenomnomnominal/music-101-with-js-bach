import React from 'react';
import styled from 'styled-components';

const TR = styled.tr`
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
`;

const TD = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
`;

const TEMPO = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
  color: gold;
`;

export function Tempo() {
  return (
    <table>
      <tbody>
        <TR>
          <TD>Adagio</TD>
          <TD>Slow and stately</TD>
          <TEMPO>66–76 bpm</TEMPO>
        </TR>
        <TR>
          <TD>Moderato</TD>
          <TD>moderately</TD>
          <TEMPO>108–120 bpm</TEMPO>
        </TR>
        <TR>
          <TD>Allegro</TD>
          <TD>Fast, quickly and bright</TD>
          <TEMPO>120–168 bpm</TEMPO>
        </TR>
        <TR>
          <TD>Presto</TD>
          <TD>Very fast</TD>
          <TEMPO>168–200 bpm</TEMPO>
        </TR>
        <TR>
          <TD>Prestissimo</TD>
          <TD>Extremely fast</TD>
          <TEMPO>>200bpm</TEMPO>
        </TR>
      </tbody>
    </table>
  );
}
