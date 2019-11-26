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

const INTERVAL = styled.td`
  padding: 0 1rem;
  border-bottom: 1px solid gold;
  color: gold;
`;

export function Intervals({ perfect = true, major = false, minor = false }) {
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
        {perfect && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 440)}>
                Perfect 1st
              </Button>
            </INTERVAL>
            <TD>A - A</TD>
            <TD>1:1</TD>
            <TD>440hz</TD>
            <TD>440hz</TD>
          </TR>
        )}
        {perfect && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 586.66)}>
                Perfect 4th
              </Button>
            </INTERVAL>
            <TD>A - D</TD>
            <TD>4:3</TD>
            <TD>440hz</TD>
            <TD>586.66hz</TD>
          </TR>
        )}
        {perfect && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 660)}>
                Perfect 5th
              </Button>
            </INTERVAL>
            <TD>A - E</TD>
            <TD>3:2</TD>
            <TD>440hz</TD>
            <TD>660hz</TD>
          </TR>
        )}
        {perfect && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 880)}>
                Perfect 8ve
              </Button>
            </INTERVAL>
            <TD>A - A</TD>
            <TD>2:1</TD>
            <TD>440hz</TD>
            <TD>880hz</TD>
          </TR>
        )}
        {minor && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 523.25)}>
                Minor 3rd
              </Button>
            </INTERVAL>
            <TD>A - C</TD>
            <TD>32/27</TD>
            <TD>440hz</TD>
            <TD>523.25Hz</TD>
          </TR>
        )}
        {major && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 556.88)}>
                Major 3rd
              </Button>
            </INTERVAL>
            <TD>A - C#</TD>
            <TD>81/64</TD>
            <TD>440hz</TD>
            <TD>556.88Hz</TD>
          </TR>
        )}
        {minor && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 695.3)}>
                Minor 6th
              </Button>
            </INTERVAL>
            <TD>A - F</TD>
            <TD>128/81</TD>
            <TD>440hz</TD>
            <TD>695.3hz</TD>
          </TR>
        )}
        {major && (
          <TR>
            <INTERVAL>
              <Button onClick={() => makeInterval(440, 742.5)}>
                Major 6th
              </Button>
            </INTERVAL>
            <TD>A - F#</TD>
            <TD>27/16</TD>
            <TD>440hz</TD>
            <TD>742.5hz</TD>
          </TR>
        )}
      </tbody>
    </table>
  );
}
