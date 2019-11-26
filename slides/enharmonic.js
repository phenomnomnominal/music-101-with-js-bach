import React from 'react';
import styled from 'styled-components';

import { useAudio } from './context/use-audio';
import { Button } from './components/button';

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

export function Enharmonic() {
  const { audio, analyser } = useAudio();

  function makeInterval(frequency1, frequency2) {
    const f1 = audio.createOscillator();
    f1.frequency.value = frequency1;
    const f2 = audio.createOscillator();
    f2.frequency.value = frequency2;
    const gain = audio.createGain();
    f1.start(audio.currentTime + 0.1);
    f1.stop(audio.currentTime + 1.1);
    f2.start(audio.currentTime + 0.1);
    f2.stop(audio.currentTime + 1.1);
    gain.gain.setValueAtTime(0, audio.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 1.1);
    f1.connect(gain);
    f2.connect(gain);
    gain.connect(analyser);
  }

  return (
    <table>
      <tbody>
        <TR>
          <TEMPO>
            <Button onClick={() => makeInterval(618.05, 618.05)}>Eb</Button>
          </TEMPO>
          <TD />
          <TD>618.05hz</TD>
        </TR>
        <TR>
          <TEMPO>
            <Button onClick={() => makeInterval(626.48, 626.48)}>D#</Button>
          </TEMPO>
          <TD />
          <TD>626.48hz</TD>
        </TR>
        <TR>
          <TEMPO>
            <Button onClick={() => makeInterval(463.54, 618.05)}>
              Bb - Eb
            </Button>
          </TEMPO>
          <TD>463.54hz</TD>
          <TD>618.05hz</TD>
        </TR>
        <TR>
          <TEMPO>
            <Button onClick={() => makeInterval(463.54, 626.48)}>
              Bb - D#
            </Button>
          </TEMPO>
          <TD>463.54hz</TD>
          <TD>626.48hz</TD>
        </TR>
      </tbody>
    </table>
  );
}
